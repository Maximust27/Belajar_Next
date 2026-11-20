import * as React from "react";
import { cn } from "cn";

/** Inventra admin typography. Sizes live in app/globals.css. */
type HeadingSize = "page" | "section" | "card";
type HeadingProps = React.ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: HeadingSize;
};

const headingStyles: Record<HeadingSize, string> = {
  page: "text-app-page font-semibold leading-tight tracking-tight",
  section: "text-app-section font-semibold leading-snug tracking-tight",
  card: "text-app-card font-semibold leading-snug",
};

export function Heading({
  as: Component = "h2",
  size = "section",
  className,
  ...props
}: HeadingProps) {
  return (
    <Component
      data-slot="heading"
      className={cn("font-heading", headingStyles[size], className)}
      {...props}
    />
  );
}

type TextProps = React.ComponentPropsWithoutRef<"p"> & {
  as?: "p" | "span" | "div";
  size?: "body" | "nav" | "helper" | "caption";
  tone?: "default" | "muted";
};

const textStyles = {
  body: "text-app-body leading-relaxed",
  nav: "text-app-nav leading-normal",
  helper: "text-app-helper leading-normal",
  caption: "text-app-caption leading-normal",
};

export function Text({
  as: Component = "p",
  size = "body",
  tone = "default",
  className,
  ...props
}: TextProps) {
  return (
    <Component
      data-slot="text"
      className={cn(
        textStyles[size],
        tone === "muted" && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Caption({
  as = "span",
  ...props
}: Omit<TextProps, "size">) {
  return <Text as={as} size="caption" tone="muted" {...props} />;
}
