import React, { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const addLike = (event) => {
    event.preventDefault()
    handleLike({ ...blog, likes: blog.likes + 1 })
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const showDeleteButton = () => {
    if (!user || blog.user.username !== user.username) {
      return { display: 'none' }
    }
    return { display: '' }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog"style={blogStyle}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        {blog.title} {blog.author}
      </div>
      {showDetails ? (
        <div>
          {blog.url} <br />
          Likes: {blog.likes}
          <button id="likeBtn" onClick={addLike}>like</button> <br />
          Added by: {blog.user?.name} <br />
          <div style={showDeleteButton()}>
            <button id="deleteButton" onClick={() => handleDelete(blog)}>delete</button>
          </div>
          <button onClick={toggleDetails}>Close</button>
        </div>
      ) : (
        <button id="show" onClick={toggleDetails}>View</button>
      )}
    </div>
  )
}


export default Blog

