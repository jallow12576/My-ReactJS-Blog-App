import Header from './Header';
import Home from './Home';
import About from './About';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Footer from './Footer';
import Missing from './Missing';
import Nav from './Nav';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';

function App() {
  //useState...
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const History = useNavigate();

  //UseEffect

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch(err) {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }


    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLocaleLowerCase()).includes(search.toLowerCase())
  || ((post.title).toLocaleLowerCase()).includes(search.toLowerCase()))

  setSearchResult(filteredResults.reverse());
  },[posts, search])

  //Useful Functions...

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList)
      History('/');
    } catch(err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPosts = {id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPosts);
      const allPosts = [...posts, response.data];
       setPosts(allPosts);
       setPostBody('');
       setPostTitle('');
       History('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPosts = {id, title: editTitle, datetime, body: postBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPosts);
      setPosts(posts.map(post => post.id === id ? { ...response.data} : post));
      setEditTitle('')
      setEditBody('');
      History('/')
    } catch(err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div className='App'>
      <Header title= "Yaya's Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResult} />} />
        <Route path='/post' element={<NewPost 
          handleSubmit={handleSubmit} 
          postTitle={postTitle} 
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
         />} />
         <Route path='/edit/:id' element={<EditPost 
          posts = {posts}
          handleEdit={handleEdit} 
          editTitle={editTitle} 
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
         />} />
        <Route path='/post/:id' element={<PostPage
         posts={posts} 
         handleDelete={handleDelete}
         />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
