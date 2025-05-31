import React, { useState, useEffect } from 'react';
import './App.css';
import { getPosts } from './lib/api';

function PostCard({ posts }) {
  return (
    <>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <img src={post.imageUrl} alt={`${post.title}-Postimage`} className="post-image" />
          <div className="post-content-wrapper">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.content}</p>
            <ul className="post-tags">
              {post.tags.map((tag, index) =>
                <li key={index} className="tag-item">{tag}</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </>
  )
}

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="app-container">
        <h1 className="main-title">✨ 게시물 목록 ✨</h1>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <h1 className="main-title">✨ 게시물 목록 ✨</h1>
        <div className="error-state">
          <h2>🚫 에러 발생!</h2>
          <p>{error}</p>
          <p>데이터를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="main-title">✨ 게시물 목록 ✨</h1>
      {posts.length > 0 ? (
        <div className="posts-grid">
          <PostCard posts={posts} />
        </div>
      ) : (
        <div className="no-posts-state">
          <p>아직 게시물이 없습니다. 🤔</p>
        </div>
      )}
    </div>
  );
}

export default App;