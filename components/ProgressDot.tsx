import { motion, useTransform } from "framer-motion";
export default function ProgressDot({ progress, index, total }: { progress: any; index: number; total: number }) {
  const dotProgress = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1]
  );
  const backgroundColor = useTransform(
    dotProgress,
    [0, 0.5],
    ["#334155", "#06b6d4"]
  );
  return <motion.div style={{ backgroundColor }} className="w-2 h-2 rounded-full" />;
}