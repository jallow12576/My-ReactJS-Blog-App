import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const PostPage = ( { posts, handleDelete }) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return(
      <main className='PostPage'>
          <article className="post">
          <Link to='/'><button className="back">Back</button></Link>
              {post && 
                <>
                  <h2 className='postHead'>{post.title}</h2>
                  <p className="postDate">{post.datetime}</p>
                  <p className="postBody">{post.body}</p>
                  <Link to={`/edit/${post.id}`}><button className="EditBtn">Edit Post</button></Link>
                  <button onClick={() => handleDelete(post.id)} className="del">Delete Post</button>
                </>
              }
              {!post &&
              <>
                <h2>Post Not Found</h2>
                <Link to='/home'>Visit Our Home Page</Link>
              </>

              }


          </article>
      </main>
  )
}

export default PostPage;