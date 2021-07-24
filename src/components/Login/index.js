import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    isLoading: false,
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({isError: false})
    const {username, password} = this.state
    if (username === '' || password === '') {
      this.setState({isError: true})
    } else {
      this.setState({isLoading: true})
      const tokenUrl = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API}`
      const tokenResponse = await fetch(tokenUrl)
      const tokenData = await tokenResponse.json()
      const requestToken = tokenData.request_token
      const loginUrl = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API}`
      const body = {
        username,
        password,
        request_token: requestToken,
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
      const response = await fetch(loginUrl, options)
      this.setState({isLoading: false})
      if (response.ok === true) {
        const data = await response.json()
        this.signInSuccess(data, body)
      } else {
        this.singInFailed()
      }
    }
  }

  signInSuccess = (data, body) => {
    const {history} = this.props
    const token = data.request_token
    localStorage.setItem('username', body.username)
    Cookies.set('token', token)
    history.replace('/')
  }

  singInFailed = () => {
    this.setState({isError: true})
  }

  renderButton = () => {
    const {isLoading} = this.state
    return isLoading ? (
      <button className="sign-in-btn" type="submit">
        <Loader type="TailSpin" height={35} width={35} color="#fff" />
      </button>
    ) : (
      <button className="sign-in-btn" type="submit">
        Sign in
      </button>
    )
  }

  renderForm = () => {
    const {username, password, isError} = this.state
    return (
      <form className="login-form-container" onSubmit={this.submitForm}>
        <h1 className="login-heading">Sign in</h1>
        <div className="login-input-container">
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={event => {
              this.setState({username: event.target.value})
            }}
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={event => {
              this.setState({password: event.target.value})
            }}
          />
        </div>
        {isError && (
          <p className="login-err-msg">
            Please enter a valid Email and Password
          </p>
        )}
        {this.renderButton()}
      </form>
    )
  }

  render() {
    return (
      <div className="login-bg">
        <img
          src="/img/movies-logo.png"
          alt="movies-logo"
          className="movies-logo"
        />
        {this.renderForm()}
      </div>
    )
  }
}

export default Login
