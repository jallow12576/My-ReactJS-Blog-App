const NewPost = ({ handleSubmit, postTitle, setPostTitle, postBody, setPostBody }) => {
    return(
        <main className="NewPost">
            <h2>Create a <span>new</span> post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title: </label>
                <input
                  id='postTitle'
                  autoFocus
                  type="text"
                  value={postTitle}
                  required
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post: </label>
                <textarea
                  id='postBody'
                  required
                  value={postBody}
                  type='text'
                  onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost;