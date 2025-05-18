""// pages/api/news.js
export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;

  try {
    console.log("Fetching news from NewsAPI with pageSize=20...");
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch from NewsAPI: ${response.statusText}`);
      return res.status(response.status).json({ error: 'Failed to fetch news.' });
    }

    const data = await response.json();
    
    // Log the total number of articles fetched
    console.log(`Total articles fetched: ${data.articles.length}`);

    if (!data.articles || data.articles.length === 0) {
      console.warn('No articles found.');
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Internal server error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
""
