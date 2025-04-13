# Long Story Short
[Long Story Short](https://long-story-short-theta.vercel.app/) is a web app that turns any book into a short-form, podcast-style audio summary—written by AI and narrated in seconds.

It combines structured retrieval, language generation, and text-to-speech synthesis into a seamless reading-to-listening experience.


## Features

- 🔎 **Book-aware summarization** using data from Wikipedia snapshots, Open Library API, and Google Books API
- 🧠 **AI-generated script** with OpenAI API
- 🎙️ **Realistic podcast narration** with ElevenLabs text-to-speech API


## Run Locally

1. Clone the repository
2. Install dependencies using `npm install`
3. Add your API keys to `.env.local`
   
   ```
   OPENAI_API_KEY=your_openai_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   ```
4. Run the app locally using `npm run dev`
   
   
## Dependencies & Data Sources

- [OpenAI API](https://platform.openai.com/) — for GPT-3.5-turbo script generation  
- [ElevenLabs API](https://www.elevenlabs.io/) — for lifelike text-to-speech  
- [Open Library](https://openlibrary.org/) — for book metadata and covers  
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) — for article context  
- [Google Books API](https://developers.google.com/books) — for additional metadata  


## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript  
- Styling: Tailwind CSS 
- Deployment: Vercel  
