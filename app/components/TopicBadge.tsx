import { cn } from "@/lib/utils";

interface TopicBadgeProps {
  label: string;
  colorClass: string;
}

export function TopicBadge({ label, colorClass }: TopicBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white",
        colorClass
      )}
    >
      {label}
    </span>
  );
}
