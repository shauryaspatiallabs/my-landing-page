import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Satellite, Server, Wifi } from "lucide-react";

interface StatusItem {
  icon: typeof Activity;
  label: string;
  value: string;
  status: "online" | "processing" | "standby";
}

const SystemStatus = () => {
  const [stats, setStats] = useState({
    uptime: 99.97,
    satellites: 12,
    nodes: 847,
    latency: 23,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        uptime: Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.01),
        satellites: Math.max(8, Math.min(16, prev.satellites + Math.floor(Math.random() * 3) - 1)),
        nodes: Math.max(700, Math.min(999, prev.nodes + Math.floor(Math.random() * 20) - 10)),
        latency: Math.max(15, Math.min(50, prev.latency + Math.floor(Math.random() * 10) - 5)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusItems: StatusItem[] = [
    {
      icon: Server,
      label: "SYSTEM UPTIME",
      value: stats.uptime.toFixed(2) + "%",
      status: "online",
    },
    {
      icon: Satellite,
      label: "ACTIVE SATELLITES",
      value: stats.satellites.toString(),
      status: "online",
    },
    {
      icon: Wifi,
      label: "PROCESSING NODES",
      value: stats.nodes.toString(),
      status: "processing",
    },
    {
      icon: Activity,
      label: "AVG LATENCY",
      value: stats.latency + "ms",
      status: stats.latency > 40 ? "standby" : "online",
    },
  ];

  const statusColors = {
    online: "#22c55e",
    processing: "var(--cyber-cyan)",
    standby: "#f97316",
  };

  return (
    <div
      className="w-full py-3 overflow-hidden"
      style={{
        backgroundColor: "rgba(10, 25, 47, 0.9)",
        borderTop: "1px solid var(--cyber-cyan)",
        borderBottom: "1px solid var(--cyber-cyan)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Status label */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#22c55e" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--cyber-cyan)" }}
            >
              System Status: Operational
            </span>
          </div>

          {/* Status items */}
          <div className="flex items-center gap-6 flex-wrap">
            {statusItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: statusColors[item.status] }}
                  />
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "var(--light-gray)" }}
                    >
                      {item.label}:
                    </span>
                    <motion.span
                      className="text-xs font-mono font-bold"
                      style={{ color: statusColors[item.status] }}
                      key={item.value}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                    >
                      {item.value}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              className="px-2 py-0.5 rounded text-xs font-mono uppercase"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                border: "1px solid #22c55e",
                color: "#22c55e",
              }}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LIVE
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
