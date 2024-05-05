import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not URL or likes by default', () => {
  const blog = {
    title: 'Attack of the clones',
    author: 'epeCheese',
    url: 'https://example.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText(/Attack of the clones/)
  const authorElement = screen.getByText(/epeCheese/)

  expect(screen.queryByText('https://example.com')).toBeNull()
  expect(screen.queryByText('Likes: 10')).toBeNull()
  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
})



test('renders URL, likes, and user when "View" button is clicked', () => {
  const blog = {
    title: 'Attack of the clones',
    author: 'epeCheese',
    url: 'https://example.com',
    likes: 10,
    user: {
      name: 'John Doe',
    },
  }

  render(<Blog blog={blog} />)

  const viewButton = screen.getByText('View')
  fireEvent.click(viewButton)

  const urlElement = screen.getByText(/https:\/\/example\.com/)
  const likesElement = screen.getByText(/Likes: 10/)
  const userElement = screen.getByText(/Added by: John Doe/)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(userElement).toBeInTheDocument()
})

test('event handler is called twice when "like" button is clicked twice', () => {
  const blog = {
    title: 'Attack of the clones',
    author: 'epeCheese',
    likes: 0,
    user: {
      name: 'John Doe',
    },
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog}  handleLike={mockHandler} />)

  const viewButton = screen.getByText(/View/)
  fireEvent.click(viewButton)

  const likeButton = screen.getByText(/like/)
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})