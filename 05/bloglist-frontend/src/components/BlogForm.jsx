import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    
    const addBlog = (e) => {
        e.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2> Add a new blog </h2>
            <form onSubmit={addBlog}>
            <div>
                Title: <input type="text" value={newTitle} name="Title"
                onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div>
                Author: <input type="text" value={newAuthor} name="Author"
                onChange={e => setNewAuthor(e.target.value)} />
            </div>
            <div>
                URL: <input type="text" value={newUrl} name="url"
                onChange={e => setNewUrl(e.target.value)} />
            </div>
            <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default BlogForm