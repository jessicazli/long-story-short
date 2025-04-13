import { generateAudioStream } from '@/app/api/generateAudio';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length < 10) {
      return new Response('Text is missing or too short', { status: 400 });
    }

    const stream = await generateAudioStream(text);

    return new Response(stream as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return new Response('Failed to generate audio', { status: 500 });
  }
}



