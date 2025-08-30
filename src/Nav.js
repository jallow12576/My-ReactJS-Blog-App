import { Link } from 'react-router-dom'

const Nav = ( {search, setSearch }) => {
    return(
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Posts"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
              <li><Link className='link' to='/'>Home</Link></li>
              <li><Link className='link' to='/post'>Post</Link></li>
              <li><Link className='link' to='/about'>About</Link></li>
            </ul>

        </nav>
    )
}

export default Nav;