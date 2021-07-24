import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="not-found-bg">
      <div className="not-found-content">
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-desc">
          Sorry, we can&apos;t find that page. You&apos;ll find lots of explore
          on the home page
        </p>
        <button type="button" className="go-to-home-btn" onClick={goToHome}>
          Netflix Home
        </button>
        <div className="error-code-container">
          <p className="error-code-heading">Error Code</p>
          <p className="error-code-value">NSES- 404</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
