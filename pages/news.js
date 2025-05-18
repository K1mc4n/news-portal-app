import { useEffect, useState } from 'react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading news...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Headlines</h1>
      {news.length === 0 && <p className="text-center">No news available.</p>}
      <div className="grid gap-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
            )}
            <p className="text-gray-700 mb-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Read full article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
