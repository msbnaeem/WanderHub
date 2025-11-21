import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadPosts from './components/ReadPosts';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';
import './App.css';

const App = () => {
  // Define routes
  let element = useRoutes([
    { path: "/", element: <ReadPosts /> },
    { path: "/create", element: <CreatePost /> },
    { path: "/edit/:id", element: <EditPost /> },
    { path: "/post/:id", element: <PostDetails /> },
  ]);

  return (
    <div className="App">
      <nav className="navbar">
        <h1>✈️ WanderHub</h1>
        <div className="nav-links">
          <Link to="/"><button className="headerBtn">Explore Feed</button></Link>
          <Link to="/create"><button className="headerBtn">Log a Trip</button></Link>
        </div>
      </nav>
      {element}
    </div>
  );
}

export default App;