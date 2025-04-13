'use client';

import { useSearchParams } from 'next/navigation';

export default function OutputPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <h1 className="text-3xl font-semibold">
        You searched for: <span className="text-blue-600">{title}</span>
      </h1>
    </div>
  );
}