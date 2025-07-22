"use client";
import { useEffect, useState } from "react";

export default function DisclaimerAlert() {
  const [visible, setVisible] = useState(true);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1500);
    return () => clearInterval(id);
  }, []);
  if (!visible) return null;
  return (
    <div
      className={`mb-4 p-3 rounded text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 shadow ${pulse ? "ring-2 ring-yellow-400" : ""}`}
    >
      Dados de referência – consulte um especialista antes de fechar o embarque.
      <button
        onClick={() => setVisible(false)}
        className="float-right text-yellow-800 dark:text-yellow-200 hover:underline"
      >
        fechar ×
      </button>
    </div>
  );
} 