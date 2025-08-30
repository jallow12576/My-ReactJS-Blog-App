import Feed from './Feed'

const Home = ( { posts } ) => {
    return(
        <main className="Main">
            {posts.length ? (
                <Feed posts={posts} />
            ): (
                <p style={{marginTop: '2rem'}} className='home'>No posts to display!</p>
            )}
        </main>
    )
}

export default Home;