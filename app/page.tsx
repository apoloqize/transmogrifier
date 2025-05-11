"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { convertJsonToYaml } from "@/lib/utils/converter";
import { toast } from "sonner";

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>(``);
  const [yamlOutput, setYamlOutput] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  // Function to copy YAML to clipboard
  const copyToClipboard = () => {
    if (yamlOutput) {
      navigator.clipboard.writeText(yamlOutput)
        .then(() => {
          toast.success("Copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy to clipboard");
          console.error('Failed to copy: ', err);
        });
    }
  };

  // Convert JSON to YAML whenever input changes
  useEffect(() => {
    const processInput = () => {
      try {
        if (!jsonInput.trim()) {
          setYamlOutput("");
          setIsValid(true);
          return;
        }
        
        const result = convertJsonToYaml(jsonInput);
        
        if (result) {
          setYamlOutput(result);
          setIsValid(true);
        } else {
          setYamlOutput("");
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error processing JSON:", error);
        setYamlOutput("");
        setIsValid(false);
      }
    };
    
    // Use a timeout to prevent potential infinite loops
    const timeoutId = setTimeout(processInput, 0);
    return () => clearTimeout(timeoutId);
  }, [jsonInput]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Transmogrifier</h1>
      <div className="w-full h-[calc(100vh-10rem)] max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* JSON Input */}
        <Card className="p-4 border-0 shadow-none">
          <div className="space-y-2">
            <Label htmlFor="json-input" className="text-base font-medium">
              JSON Input
            </Label>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste MCP server JSON here..."
              className={`h-[calc(100vh-16rem)] font-mono text-sm resize-none ${!isValid && jsonInput ? 'border-red-500' : ''}`}
            />
            {!isValid && jsonInput && (
              <p className="text-red-500 text-sm">
                Invalid JSON format. Please check your input.
              </p>
            )}
          </div>
        </Card>

        {/* YAML Output */}
        <Card className="p-4 border-0 shadow-none">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="yaml-output" className="text-base font-medium">
                LibreChat YAML Output
              </Label>
            </div>
            <Textarea
              id="yaml-output"
              value={yamlOutput || "# Generated YAML will appear here..."}
              readOnly
              onClick={copyToClipboard}
              placeholder="Generated YAML will appear here..."
              className="h-[calc(100vh-16rem)] font-mono text-sm cursor-pointer hover:bg-muted resize-none"
              title="Click to copy to clipboard"
            />
          </div>
        </Card>
      </div>

      {/* Instructions removed */}
    </main>
  );
}
