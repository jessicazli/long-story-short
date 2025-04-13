import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateScript(
  context: string,
  tone: string = "engaging"
) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a podcast scriptwriter.Your job is to write a 3-minute podcast script summarizing a book in a **${tone}** tone.
        Focus on the **storyline, characters, and major themes** of the book — especially if it is fictional. Avoid historical context, critical reception, or publication analysis unless it is directly relevant to understanding the story.
        This summary should feel fully contextualized and complete — like something a listener could hear and walk away with a deep understanding of the book. **Do not encourage listeners to read the book**, and **do not include podcast intros or outros** like “Welcome back” or “Thanks for listening.” Just begin directly with the story and end naturally.
        Write in a way that sounds natural when spoken aloud, as if you're telling the story to someone who's curious, thoughtful, and ready to listen.`,
      },
      {
        role: "user",
        content: context,
      },
    ],
  });

  return completion.choices[0].message.content?.trim() || "";
}
