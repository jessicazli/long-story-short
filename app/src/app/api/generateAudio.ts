import { ElevenLabsClient } from 'elevenlabs';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

export async function generateAudioStream(text: string) {
  if (!text || text.trim().length < 10) {
    throw new Error('Text too short to synthesize.');
  }

  const stream = await client.textToSpeech.convert('21m00Tcm4TlvDq8ikWAM', {
    text,
    model_id: 'eleven_multilingual_v2',
    output_format: 'mp3_44100_128',
  });

  return stream;
}



