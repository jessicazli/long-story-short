'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PodcastPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  const [script, setScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loadingScript, setLoadingScript] = useState(true);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Fetch script
  useEffect(() => {
    if (!title) return;

    const fetchScript = async () => {
      setLoadingScript(true);
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, tone: 'engaging' }),
        });

        const data = await res.json();
        setScript(data.script || 'No script returned.');
      } catch (err) {
        console.error('Error generating script:', err);
        setScript('Error generating script.');
      } finally {
        setLoadingScript(false);
      }
    };

    fetchScript();
  }, [title]);

  // Get audio file
  useEffect(() => {
    if (!script || script.startsWith('Error') || script === 'No script returned.') return;

    const fetchAudio = async () => {
      setLoadingAudio(true);
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: script }),
        });

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (err) {
        console.error('Error generating audio:', err);
      } finally {
        setLoadingAudio(false);
      }
    };

    fetchAudio();
  }, [script]);

  return (
    <div className="min-h-screen p-8 sm:p-20 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Podcast Script for: {title}</h1>

      {loadingScript ? (
        <p className="animate-pulse text-lg">Generating podcast script...</p>
      ) : (
        <>
          {loadingAudio && (
            <p className="text-sm text-muted-foreground">Generating audio...</p>
          )}

          {audioUrl && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">🎧 Listen to the episode:</p>
              <audio controls src={audioUrl} className="w-full" />
              <a
                href={audioUrl}
                download="bookbite.mp3"
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                Download MP3
              </a>
            </div>
          )}

          <pre className="bg-gray-100 p-6 rounded-lg whitespace-pre-wrap text-gray-800 text-sm">
            {script}
          </pre>
        </>
      )}
    </div>
  );
}
