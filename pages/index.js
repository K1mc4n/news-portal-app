import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/news?category=technology")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Latest Technology News</h1>
      {articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, idx) => (
            <li key={idx} className="border-b pb-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
                {article.title}
              </a>
              <p className="text-gray-600">{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
