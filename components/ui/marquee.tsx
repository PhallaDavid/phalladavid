import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:0.75rem] [gap:var(--gap)] [--duration:30s]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-start [gap:var(--gap)]",
              vertical
                ? reverse
                  ? "animate-marquee-vertical-reverse flex-col"
                  : "animate-marquee-vertical flex-col"
                : reverse
                  ? "animate-marquee-reverse flex-row"
                  : "animate-marquee flex-row",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
            style={{
              animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export default Marquee;
