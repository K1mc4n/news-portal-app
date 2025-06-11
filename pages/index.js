// pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading news...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Headlines</h1>
      {news.length === 0 ? (
        <p className="text-center">No news available.</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-1 line-clamp-2">{article.title}</h2>
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full max-h-40 sm:max-h-60 md:max-h-72 object-cover rounded-lg mb-2"
                />
              ) : (
                <img
                  src="/fallback-image.png"
                  alt="fallback"
                  className="w-full max-h-40 sm:max-h-60 md:max-h-72 object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-gray-700 mb-2 line-clamp-3 text-sm">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
              >
                Read full article →
              </a>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
        <Link href="/news" className="text-blue-500 hover:underline">
          View More News →
        </Link>
      </div>
    </div>
  );
}
