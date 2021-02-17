import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null
  })
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [newAuthor, setNewAuthor] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
/*      blogService.setToken(user.token)    */
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)      
      )
      
      blogService.setToken(user.token) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("something is wrong with setToken or loginService")
//      setErrorMessage('wrong credentials')
//      setTimeout(() => {
//        setErrorMessage(null)
//      }, 5000)
    }
  }

  const handleNewTitle = ({target}) => setNewTitle(target.value)
  const handleNewAuthor = ({target}) => setNewAuthor(target.value)
  const handleNewUrl = ({target}) => setNewUrl(target.value)

  const addBlog = async (event) => {
    const sortBlogs = (blogs) => blogs.sort((b,a) => (a.likes-b.likes))

    try {
      event.preventDefault()

      const blogObject = {
        author: newAuthor,
        title: newTitle,
        url:newUrl,
      }

      await blogService.create(blogObject)
      const renewedBlogs = await blogService.getAll()
      setBlogs(sortBlogs(renewedBlogs))
//      notify(`a new blog ${newTitle.value} by ${newAuthor.value} added`)
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")
    } catch(exception) {
//      notify('some problems with blog addition')
    }
  }

  if (user === null) {
    return (
      <div>
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
        </form>
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
      </div>
      <div>
        <button onClick = {() => {
          setUser(null)
          setUsername('')
          setPassword('')
          window.localStorage.clear()
        }}
        >
        logout
        </button>
        </div>
      <h2>New Blog</h2>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newUrl={newUrl}
          newAuthor = { newAuthor }
          handleNewTitle = {handleNewTitle}
          handleNewAuthor = {handleNewAuthor}
          handleNewUrl = {handleNewUrl}


        />
      <div>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App