"use client";

import { useState } from "react";

const steps = [
  { id: 1, title: "Idea", desc: "Validate your problem" },
  { id: 2, title: "Business Plan", desc: "Write the 1-pager" },
  { id: 3, title: "Prototype", desc: "Test with real users" },
  { id: 4, title: "Pitch", desc: "Apply for funding" },
];

export function Roadmap() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    setCompleted((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map((step) => {
        const isDone = completed.includes(step.id);
        return (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`text-left border-2 border-ink p-5 transition-colors duration-200 ${
              isDone ? "bg-forest text-paper" : "bg-paper text-ink hover:bg-paper-deep"
            }`}
          >
            <span className={`font-mono text-xs uppercase tracking-wider block mb-4 ${isDone ? "text-gold" : "text-ink-faint"}`}>
              Step 0{step.id}
            </span>
            <h3 className="text-xl leading-tight mb-1">{step.title}</h3>
            <p className={`text-sm ${isDone ? "text-paper/70" : "text-ink-soft"}`}>
              {step.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}