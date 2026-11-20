"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion() {
  // No animation on the server; the client gets the actual OS preference.
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
