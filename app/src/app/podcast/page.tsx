'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PodcastPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!title) return;

    const fetchScript = async () => {
      setLoading(true);

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, tone: 'engaging' }),
        });

        const data = await res.json();
        setScript(data.script || 'No script returned.');
      } catch (err) {
        console.error(err);
        setScript('Error generating script.');
      } finally {
        setLoading(false);
      }
    };

    fetchScript();
  }, [title]);

  return (
    <div className="min-h-screen p-8 sm:p-20 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Podcast Script for: {title}</h1>
      {loading ? (
        <p className="animate-pulse text-lg">Generating podcast script...</p>
      ) : (
        <pre className="bg-gray-100 p-6 rounded-lg whitespace-pre-wrap text-gray-800 text-sm">
          {script}
        </pre>
      )}
    </div>
  );
}
