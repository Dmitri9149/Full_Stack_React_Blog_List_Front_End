import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleNewTitle
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
            {...newAuthor}
            reset = '*'
          />
        </div>
        <div>
          url
          <input
            {...newUrl}
            reset ='*'
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm