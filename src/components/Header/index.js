import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    isShowMenu: false,
  }

  largeNavs = [
    {
      key: 'Home',
      value: '/',
    },
    {
      key: 'Popular',
      value: '/popular-movies',
    },
  ]

  smallNavs = [
    {
      key: 'Home',
      value: '/',
    },
    {
      key: 'Popular',
      value: '/popular-movies',
    },
    {
      key: 'Account',
      value: '/account',
    },
  ]

  activeClass = 'active-class'

  toggleMenu = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  renderSearchIcon = () => (
    <Link to="/search">
      <i className="fas fa-search search-icon" />
    </Link>
  )

  renderSearchBar = () => {
    const {onValueChange, searchValue} = this.props
    return (
      <div className="search-input-container">
        <input
          type="search"
          placeholder="search"
          value={searchValue}
          onChange={onValueChange}
        />
        <i
          role="button"
          tabIndex="0"
          aria-label="search button"
          className="fas fa-search search-icon"
          onClick={onValueChange}
        />
      </div>
    )
  }

  renderMenu = () => {
    const {history} = this.props
    const {location} = history
    const {pathname} = location
    return (
      <div className="menu-container">
        {this.smallNavs.map(nav => {
          const {key, value} = nav
          const linkClass = value === pathname ? this.activeClass : ''
          return (
            <Link to={value} className={linkClass} key={key}>
              {key}
            </Link>
          )
        })}
        <button
          type="button"
          onClick={this.toggleMenu}
          className="close-menu-btn"
        >
          <i className="fas fa-times-circle menu-close-icon" />
        </button>
      </div>
    )
  }

  renderHeader = () => {
    const {history} = this.props
    const {location} = history
    const {pathname} = location
    const cond = pathname === '/search'
    const {isShowMenu} = this.state
    return (
      <div className="header-container">
        <div className="header-inner-container">
          <div className="header-left">
            <img
              src="/img/movies-logo.png"
              alt="movies-logo-header"
              className="movies-logo-header"
              onClick={() => {
                history.replace('/')
              }}
            />
            <div className="nav-items">
              {this.largeNavs.map(nav => {
                const {key, value} = nav
                const linkClass = value === pathname ? this.activeClass : ''
                return (
                  <Link to={value} className={linkClass} key={key}>
                    {key}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="header-right">
            {cond ? this.renderSearchBar() : this.renderSearchIcon()}
            <img
              src="/img/add-to-queue.png"
              alt="add-to-queue"
              className="add-to-queue"
              onClick={this.toggleMenu}
            />
            <img
              src="/img/Avatar.png"
              alt="user-profile"
              className="user-profile"
              onClick={() => {
                history.replace('/account')
              }}
            />
          </div>
        </div>
        {isShowMenu ? this.renderMenu() : null}
      </div>
    )
  }

  render() {
    return this.renderHeader()
  }
}
export default withRouter(Header)
