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

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading news...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">📰 Top Headlines</h1>

      {news.length === 0 ? (
        <p className="text-center text-gray-500">No news available.</p>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                {article.title}
              </h2>

              <div className="mb-3">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full max-h-48 sm:max-h-60 md:max-h-72 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src="/fallback-image.png"
                    alt="fallback"
                    className="w-full max-h-48 sm:max-h-60 md:max-h-72 object-cover rounded-lg"
                  />
                )}
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                {article.description}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read full article →
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link href="/news" className="text-blue-500 hover:underline text-base font-medium">
          View More News →
        </Link>
      </div>
    </div>
  );
}
