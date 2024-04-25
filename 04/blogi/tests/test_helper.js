const Blog = require("../models/blog");
const User = require("../models/user");


const initialblogs = [
    {   
      title: 'Jedin paluu',
      author: 'EetuH',
      url: 'yapping.com',
      likes: 5,
    }, 
    {    
      title: 'Imperiumin vastaisku',
      author: 'EetuH2',
      url: 'yappingsommore.com',
      likes: 15,
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "New Hope",
    author: "Beetu",
    url: "Beetunbogi",
    likes: 665,
  });

  await blog.save();
  await Blog.findOneAndRemove({ title: "New Hope" });

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  nonExistingId,
  blogsInDb,
  initialblogs,
  usersInDb
};