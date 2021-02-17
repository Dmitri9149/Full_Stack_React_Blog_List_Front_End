import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleNewTitle,
  handleNewAuthor,
  handleNewUrl,
}) => {
  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value = {newTitle}
            onChange = {handleNewTitle}
          />
        </div>
        <div>
          author
          <input
            value = {newAuthor}
            onChange = {handleNewAuthor}
          />
        </div>
        <div>
          url
          <input
            value = {newUrl}
            onChange = {handleNewUrl}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm