import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  suffix = "", 
  prefix = "", 
  duration = 2000,
  className = ""
}: AnimatedCounterProps) {
  const { ref, formattedCount } = useCountUp({ end, duration, suffix, prefix });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formattedCount}
    </span>
  );
}
