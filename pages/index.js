import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.articles) setArticles(data.articles.slice(0, 5));
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Top News</h1>
      {articles.length === 0 && <p>Loading...</p>}
      {articles.map((article, index) => (
        <div key={index} style={styles.card}>
          <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
            <h2 style={styles.headline}>{article.title}</h2>
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news" style={styles.image} />
            )}
            <p style={styles.description}>{article.description}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  card: {
    marginBottom: '1.5rem',
    backgroundColor: '#f4f4f4',
    padding: '1rem',
    borderRadius: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  headline: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.9rem',
  },
};
