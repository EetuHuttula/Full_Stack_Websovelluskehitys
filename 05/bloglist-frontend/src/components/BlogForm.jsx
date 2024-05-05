import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = React.useState('')
  const [newAuthor, setNewAuthor] = React.useState('')
  const [newUrl, setNewUrl] = React.useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            id="title"
            value={newTitle}
            placeholder='title'
            name="Title"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            id="author"
            placeholder='author'
            value={newAuthor}
            name="Author"
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            id="url"
            placeholder='url'
            value={newUrl}
            name="url"
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <button id="add" type="submit">Add</button>
      </form>
    </div>
  )
}

// PropTypes definition
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
