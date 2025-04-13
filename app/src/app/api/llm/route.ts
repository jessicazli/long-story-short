import { NextResponse } from 'next/server';
import { fetchData } from '@/app/api/fetchData';
import { generateScript } from '@/app/api/generateScript';

export async function POST(req: Request) {
  try {
    const { title, tone = 'engaging' } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Missing book title' }, { status: 400 });
    }

    const { wikipedia, openLibrary, googleBooks } = await fetchData(title);

    const context = `
# Wikipedia Article
${wikipedia}

# Open Library Description
${openLibrary}

# Google Books Info
${googleBooks}
    `.trim();

    const script = await generateScript(context, tone);

    return NextResponse.json({ script });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
  }
}



