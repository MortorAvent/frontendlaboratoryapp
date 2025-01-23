'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "articles"),
          where("user", "==", user?.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(fetchedArticles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchArticles();
    }
  }, [user]);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Your Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="border-b py-2">
              <h2 className="text-xl">{article.title}</h2>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
