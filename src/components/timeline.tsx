import { MovementBadge } from "./movement-badge";

interface TimelineEntry {
  id: string;
  timestamp: string;
  action: string;
  qty: number;
  path: string;
  user: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="space-y-0">
      {entries.map((entry, index) => (
        <div key={entry.id} className="relative pl-10 pb-8 group">
          {/* Connector line */}
          {index < entries.length - 1 && (
            <div className="absolute left-[15px] top-[32px] bottom-0 w-[2px] bg-gradient-to-b from-primary/40 to-primary/10" />
          )}

          {/* Node dot */}
          <div className="absolute left-[8px] top-[6px] w-[16px] h-[16px] rounded-full border-2 border-primary bg-background flex items-center justify-center">
            <div className="w-[6px] h-[6px] rounded-full bg-primary" />
          </div>

          {/* Content card */}
          <div className="bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:border-primary/30 hover:bg-card/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                {entry.timestamp}
              </span>
              <MovementBadge
                type={
                  entry.action.toLowerCase() as
                    | "inbound"
                    | "outbound"
                    | "transfer"
                    | "adjustment"
                }
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  Action
                </p>
                <p className="text-sm font-mono text-foreground">
                  {entry.action}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  Qty
                </p>
                <p
                  className={`text-sm font-mono ${
                    entry.qty > 0 ? "text-neon-lime" : "text-neon-red"
                  }`}
                >
                  [{entry.qty > 0 ? `+${entry.qty}` : entry.qty}]
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  Path
                </p>
                <p className="text-sm font-mono text-foreground">
                  {entry.path}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  User
                </p>
                <p className="text-sm font-mono text-primary">{entry.user}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
