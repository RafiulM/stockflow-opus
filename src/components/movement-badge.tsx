import { Badge } from "@/components/ui/badge";

type MovementType = "inbound" | "outbound" | "transfer" | "adjustment";

const typeConfig: Record<MovementType, { label: string; className: string }> = {
  inbound: {
    label: "Inbound",
    className:
      "bg-neon-lime/15 text-neon-lime border-neon-lime/30 hover:bg-neon-lime/25",
  },
  outbound: {
    label: "Outbound",
    className:
      "bg-neon-red/15 text-neon-red border-neon-red/30 hover:bg-neon-red/25",
  },
  transfer: {
    label: "Transfer",
    className:
      "bg-neon-blue/15 text-neon-blue border-neon-blue/30 hover:bg-neon-blue/25",
  },
  adjustment: {
    label: "Adjustment",
    className:
      "bg-neon-amber/15 text-neon-amber border-neon-amber/30 hover:bg-neon-amber/25",
  },
};

export function MovementBadge({ type }: { type: MovementType }) {
  const config = typeConfig[type];
  return (
    <Badge
      variant="outline"
      className={`font-mono text-[11px] px-2 py-0.5 ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
