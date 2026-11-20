"use client";

import { useEffect } from "react";

const MOTION_SELECTOR = "[data-motion]";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const keyframes: Record<string, Keyframe[]> = {
  rise: [
    { opacity: 0, transform: "translate3d(0, 26px, 0)" },
    { opacity: 1, transform: "translate3d(0, 0, 0)" },
  ],
  pop: [
    { opacity: 0, transform: "translate3d(0, 22px, 0) scale(0.94)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  hero: [
    { opacity: 0, transform: "translate3d(0, 20px, 0) scale(0.975)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  artwork: [
    { opacity: 0, transform: "translate3d(34px, 12px, 0) scale(0.94)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  left: [
    { opacity: 0, transform: "translate3d(-34px, 0, 0)" },
    { opacity: 1, transform: "translate3d(0, 0, 0)" },
  ],
  "flow-left": [
    { opacity: 0, transform: "translate3d(-52px, 16px, 0) scale(0.91)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  "flow-center": [
    { opacity: 0, transform: "translate3d(0, 30px, 0) scale(0.87)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  "flow-right": [
    { opacity: 0, transform: "translate3d(52px, 16px, 0) scale(0.91)" },
    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
  ],
  fade: [{ opacity: 0 }, { opacity: 1 }],
};

const durations: Record<string, number> = {
  hero: 860,
  artwork: 960,
  "flow-left": 750,
  "flow-center": 800,
  "flow-right": 750,
  fade: 520,
  pop: 730,
  rise: 730,
  left: 700,
};

/**
 * Progressive enhancement: content stays visible if JS is disabled.
 * A single observer handles server-rendered and streamed content across routes.
 */
export function MotionObserver() {
  useEffect(() => {
    // CSS hides targets before the first paint. If this browser cannot
    // animate them, remove the concealment rather than leaving blank content.
    if (
      !window.matchMedia("(scripting: enabled)").matches ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    ) {
      document.documentElement.dataset.motionDisabled = "true";
      return;
    }

    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const registered = new WeakSet<Element>();
    const running = new Map<Animation, HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element = entry.target as HTMLElement;
          observer.unobserve(element);

          if (element.dataset.motionState === "shown") continue;

          if (media.matches) {
            element.dataset.motionState = "shown";
            continue;
          }

          const preset = element.dataset.motion ?? "rise";
          const frames = keyframes[preset] ?? keyframes.rise;
          const rawDelay = Number(element.dataset.motionDelay ?? 0);
          const delay = Number.isFinite(rawDelay)
            ? Math.max(0, Math.min(rawDelay, 900))
            : 0;

          const animation = element.animate(frames, {
            duration: durations[preset] ?? 730,
            delay,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          });

          running.set(animation, element);
          void animation.finished.then(
            () => {
              // Set the final CSS state BEFORE removing the WAAPI fill.
              // Otherwise the element briefly returns to opacity: 0.
              element.dataset.motionState = "shown";
              animation.cancel();
              running.delete(animation);
            },
            () => running.delete(animation),
          );
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" },
    );

    const observe = (element: Element) => {
      if (registered.has(element) || (element as HTMLElement).dataset.motionState === "shown") return;
      registered.add(element);
      observer.observe(element);
    };

    const scan = (node: Element) => {
      if (node.matches(MOTION_SELECTOR)) observe(node);
      node.querySelectorAll(MOTION_SELECTOR).forEach(observe);
    };

    scan(document.body);

    // React streaming and client-side navigation add new DOM nodes later.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) scan(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const onMotionPreferenceChange = () => {
      if (media.matches) {
        running.forEach((element, animation) => {
          element.dataset.motionState = "shown";
          animation.cancel();
        });
        running.clear();
      }
    };
    media.addEventListener("change", onMotionPreferenceChange);

    return () => {
      mutations.disconnect();
      observer.disconnect();
      media.removeEventListener("change", onMotionPreferenceChange);
      running.forEach((element, animation) => {
        element.dataset.motionState = "shown";
        animation.cancel();
      });
      running.clear();
    };
  }, []);

  return null;
}
