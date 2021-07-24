import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Footer from '../Footer'
import './index.css'

class PopularMovies extends Component {
  state = {
    popularMovies: [],
    pageNumber: 1,
    isLoading: true,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=${pageNumber}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const {results} = data
      this.setState({popularMovies: results, isLoading: false})
    }
  }

  renderLoader = () => (
    <Loader type="TailSpin" height={35} width={35} color="red" />
  )

  decreasePageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
          isLoading: true,
        }),
        () => {
          this.getPopularMovies()
        },
      )
    }
  }

  increasePageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber < 20) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber + 1,
          isLoading: true,
        }),
        () => {
          this.getPopularMovies()
        },
      )
    }
  }

  renderPagination = () => {
    const {pageNumber} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="pagination-btn left-pagination"
          onClick={this.decreasePageNumber}
        >
          <i className="fas fa-angle-left" />
        </button>
        <p className="pagination-stats">{`${pageNumber} of 20`}</p>
        <button
          type="button"
          className="pagination-btn right-pagination"
          onClick={this.increasePageNumber}
        >
          <i className="fas fa-angle-right" />
        </button>
      </div>
    )
  }

  renderMovies = () => {
    const {popularMovies} = this.state
    return (
      <div className="popular-movies-container">
        <div className="popular-inner-movies-container">
          {popularMovies.map(movie => {
            const {id} = movie
            const imagePath = movie.poster_path
            const imageUrl = `https://image.tmdb.org/t/p/original/${imagePath}`
            return (
              <Link to={`/movies/${id}`} key={id}>
                <img
                  alt={movie.title}
                  src={imageUrl}
                  className="popular-movie-img"
                />
              </Link>
            )
          })}
        </div>
        {this.renderPagination()}
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="popular-bg">
        {isLoading ? this.renderLoader() : this.renderMovies()}
      </div>
    )
  }
}

export default PopularMovies
