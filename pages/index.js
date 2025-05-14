import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setArticles(data.articles || []));
  }, []);

  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold text-blue-700">NewsPortal</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">Technology</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Business</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Health</a>
          </nav>
        </div>
      </header>

      <section className="bg-gray-50 py-8 px-4">
        {articles[0] && (
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
            <img src={articles[0].urlToImage} alt="" className="w-full md:w-1/2 object-cover rounded" />
            <div>
              <h2 className="text-2xl font-bold mb-2">{articles[0].title}</h2>
              <p className="text-gray-600 mb-4">{articles[0].description}</p>
              <a href={articles[0].url} target="_blank" className="text-blue-600 underline">Read Full Article</a>
            </div>
          </div>
        )}
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-xl font-semibold mb-4">More Headlines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, index) => (
            <div key={index} className="bg-white rounded shadow hover:shadow-lg transition">
              <img src={article.urlToImage} alt="" className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{article.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                <a href={article.url} target="_blank" className="text-blue-600 mt-2 inline-block">Read more</a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-8 text-center text-sm text-gray-500 py-6">
        © 2025 NewsPortal. All rights reserved.
      </footer>
    </>
  );
}
