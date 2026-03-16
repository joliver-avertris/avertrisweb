import { cn } from "@/lib/utils";
import { useState } from "react";
export const Component = () => {
  const [count, setCount] = useState(0);
  return (
   <div className="min-h-screen w-full relative bg-white">
  {/* Soft Orange Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #FF6B00 0%, transparent 70%)
      `,
      opacity: 0.15,
    }}
  />
     {/* Your Content/Components */}
</div>
  );
};
