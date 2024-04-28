import { useState, useEffect, useRef } from "react";
import "./app.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggable from "./components/Toggable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => b.likes - a.likes)


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (newBlog) => {
    newBlog.title = newBlog.title.trim();
    newBlog.author = newBlog.author.trim();
    newBlog.url = newBlog.url.trim();
    try {
      const addedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(addedBlog));
      blogFormRef.current.toggleVisibility();
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (ex) {
      setMessage("Information missing");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, "logging in");
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("wrong credentials");
      setMessage("wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        <Notification message={message} />
      </form>
    </>
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log(user.username, "logged out");
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const handleLike = async (blogObject) => {
    try {
      blogService.setToken(user.token);
      const returnedBlog = await blogService.updateBlog(blogObject);
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      );
      setMessage(`blog ${returnedBlog.title} liked!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Could not like the blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (blogObject) => {
    try {
      const confirm = window.confirm(
        `Do you really want to remove blog ${blogObject.title} by ${blogObject.author}?`
      )
      if (confirm) {
        blogService.setToken(user.token)
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      }
    } catch (exception) {
      console.log(exception)
      setMessage("could not remove blog")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  

  const blogForm = () => (
    <>
      <h1> Bloglist </h1>

      <p>
        <b>{user.name} logged in </b>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Notification message={message} />
      <Toggable buttonLabel={"Add blog"} ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>

      {sortedBlogs.map((b) => (
        <Blog key={b.id} blog={b} handleLike={handleLike} handleDelete={handleDelete}
        user={user} />
      ))}
    </>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  );
};

export default App;
