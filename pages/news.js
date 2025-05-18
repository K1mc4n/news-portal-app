""// pages/news.js
import { useEffect, useState } from 'react';

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Headlines</h1>
      {news.length === 0 ? (
        <p className="text-center">No news available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h2>
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <img
                  src="/fallback-image.png"
                  alt="fallback"
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.description}</p>
              <a
                href={article.url}
