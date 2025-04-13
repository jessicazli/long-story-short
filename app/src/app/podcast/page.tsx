"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PodcastPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [script, setScript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loadingScript, setLoadingScript] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!newTitle) return;
    setAudioUrl("");
    setScript("");
    const encodedTitle = encodeURIComponent(newTitle);
    router.push(`/podcast?title=${encodedTitle}`);
    setNewTitle("");
  };

  // Fetch script
  useEffect(() => {
    if (!title) return;

    const fetchScript = async () => {
      setLoadingScript(true);
      try {
        const res = await fetch("/api/llm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, tone: "engaging" }),
        });

        const data = await res.json();
        setScript(data.script || "No script returned.");
      } catch (err) {
        console.error("Error generating script:", err);
        setScript("Error generating script.");
      } finally {
        setLoadingScript(false);
      }
    };

    setAudioUrl("");
    fetchScript();
  }, [title]);

  // Get audio file
  useEffect(() => {
    if (
      !script ||
      script.startsWith("Error") ||
      script === "No script returned."
    )
      return;

    const fetchAudio = async () => {
      setLoadingAudio(true);
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: script }),
        });

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (err) {
        console.error("Error generating audio:", err);
      } finally {
        setLoadingAudio(false);
      }
    };

    fetchAudio();
  }, [script]);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="h-screen w-full flex flex-col p-20 font-display">
      <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-12 text-center">
          {title}
        </h1>
        <div className="grid md:grid-cols-2 gap-8 w-full flex-1">
          <div className="w-full h-full flex flex-col bg-white shadow rounded-lg p-6 border overflow-y-scroll">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-2">
                1
              </div>
              <h2 className="text-lg font-semibold">Script</h2>
            </div>
            {loadingScript ? (
              <p className="text-sm text-muted-foreground animate-pulse">
                Creating a script...
              </p>
            ) : (
              <div className="flex-1 overflow-hidden relative">
                <p className="whitespace-pre-wrap text-sm text-gray-800 absolute inset-0 overflow-y-auto pr-2">
                  {script}
                </p>
              </div>
            )}
          </div>
          <div className="w-full h-full flex flex-col gap-8">
            <div
              className={`w-full h-full flex flex-col p-6 border rounded-lg transition ${
                !audioUrl && !loadingAudio
                  ? "bg-gray-100 opacity-50 pointer-events-none"
                  : "bg-white shadow"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-2">
                  2
                </div>
                <h2 className="text-lg font-semibold">Podcast</h2>
              </div>
              {loadingAudio && (
                <p className="text-sm text-muted-foreground animate-pulse">
                  Creating a podcast...
                </p>
              )}
              {audioUrl && (
                <div className="flex-1 flex flex-col justify-center gap-8">
                  <p className="text-sm">Enjoy your podcast!</p>
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}
            </div>
            <div
              className={`w-full h-full flex flex-col p-6 border rounded-lg transition ${
                !audioUrl
                  ? "bg-gray-100 opacity-50 pointer-events-none"
                  : "bg-white shadow"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-2">
                  3
                </div>
                <h2 className="text-lg font-semibold">Create Another</h2>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-8">
                <div className="flex items-center justify-center gap-4 w-full">
                  <Input
                    placeholder="Enter a book title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <Button onClick={handleSubmit} disabled={!newTitle.trim()}>
                    Try it now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
