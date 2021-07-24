import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Account = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('token')
    history.replace('/login')
  }
  const username = localStorage.getItem('username')
  return (
    <div className="account-bg">
      <h1 className="account-heading">Account</h1>
      <hr className="account-hr" />
      <div className="account-stats-container">
        <p className="account-stats-heading">Member ship</p>
        <div>
          <p className="account-stats-value">{`${username.toLowerCase()}@gmail.com`}</p>
          <p className="account-stats-value account-password">
            Password : ************
          </p>
        </div>
      </div>
      <hr className="account-hr" />
      <div className="account-stats-container">
        <p className="account-stats-heading">Plan details</p>
        <div>
          <p className="account-stats-value">
            Premium <span className="account-premium-type">Ultra HD</span>
          </p>
        </div>
      </div>
      <hr className="account-hr" />
      <button type="button" className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Account)
