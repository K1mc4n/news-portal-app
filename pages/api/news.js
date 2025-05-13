export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const category = req.query.category || "general";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    res.status(200).json(data.articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
