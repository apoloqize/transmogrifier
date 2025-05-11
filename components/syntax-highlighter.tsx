"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";

interface CodeHighlighterProps {
  code: string;
  language: string;
}

export function CodeHighlighter({ code, language }: CodeHighlighterProps) {
  const [mounted, setMounted] = useState(false);

  // For hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <pre className="font-mono text-sm p-4 overflow-auto rounded-md bg-secondary">
        {code}
      </pre>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={{}}
      className="rounded-md"
      customStyle={{
        margin: 0,
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        minHeight: "350px",
        maxHeight: "700px",
        fontFamily: "monospace",
        background: "white",
        fontStyle: "normal",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
