interface WikipediaPage {
  extract?: string;
  title: string;
  pageid: number;
}

interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: WikipediaPage;
    };
  };
}

export async function fetchData(title: string) {
  const encoded = encodeURIComponent(title);

  let wikipedia = "";
  let openLibrary = "";
  let googleBooks = "";

  // Wikipedia (Full Article)
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&origin=*&titles=${encoded}`
    );
    const json = await res.json() as WikipediaResponse;
    const page = Object.values(json.query.pages)[0];
    wikipedia = page.extract || "No Wikipedia article found.";
  } catch (err) {
    console.error("Wikipedia error:", err);
    wikipedia = "Failed to load Wikipedia article.";
  }

  // Open Library
  try {
    const olRes = await fetch(
      `https://openlibrary.org/search.json?title=${encoded}`
    );
    const olJson = await olRes.json();
    const workKey = olJson.docs?.[0]?.key;
    if (workKey) {
      const workRes = await fetch(`https://openlibrary.org${workKey}.json`);
      const workJson = await workRes.json();
      const desc = workJson.description;
      openLibrary =
        typeof desc === "string"
          ? desc
          : desc?.value || "No Open Library description available.";
    } else {
      openLibrary = "No Open Library data found.";
    }
  } catch (err) {
    console.error("Open Library error:", err);
    openLibrary = "Failed to load Open Library data.";
  }

  // Google Books
  try {
    const gbRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encoded}`
    );
    const gbJson = await gbRes.json();
    const book = gbJson.items?.[0]?.volumeInfo;

    if (book) {
      googleBooks = `
  Title: ${book.title}
  Authors: ${book.authors?.join(", ") || "Unknown"}
  Published: ${book.publishedDate || "N/A"}
  Publisher: ${book.publisher || "N/A"}
  Page Count: ${book.pageCount || "N/A"}
  Categories: ${book.categories?.join(", ") || "N/A"}
  Description: ${book.description || "No description provided."}
        `.trim();
    } else {
      googleBooks = "No Google Books result found.";
    }
  } catch (err) {
    console.error("Google Books error:", err);
    googleBooks = "Failed to load Google Books data.";
  }

  return { wikipedia, openLibrary, googleBooks };
}
