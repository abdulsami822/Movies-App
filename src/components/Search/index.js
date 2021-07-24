import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class Search extends Component {
  state = {
    moviesList: [],
    pageNumber: 1,
    isLoading: true,
    searchValue: '',
    noResults: false,
    isPagintion: true,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async () => {
    const {pageNumber, searchValue} = this.state
    const query = searchValue === '' ? 'Fast' : searchValue
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&language=en-US&query=${query}&page=${pageNumber}`
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    if (results.length === 0) {
      this.setState({
        isLoading: false,
        noResults: true,
      })
    } else if (results.length < 20) {
      this.setState({
        moviesList: results,
        isLoading: false,
        isPagintion: false,
      })
    } else {
      this.setState({
        moviesList: results,
        isLoading: false,
      })
    }
  }

  decreasePageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
          isLoading: true,
        }),
        () => {
          this.getSearchMovies()
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
          this.getSearchMovies()
        },
      )
    }
  }

  onSearchValueChange = event => {
    const {value} = event.target

    this.setState(
      {
        searchValue: value,
        isLoading: true,
        noResults: false,
      },
      () => {
        this.getSearchMovies()
      },
    )
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

  renderLoader = () => (
    <Loader type="TailSpin" height={35} width={35} color="red" />
  )

  renderNoResults = () => {
    const {searchValue} = this.state
    return (
      <div className="no-results-container">
        <img
          src="/img/no_results.png"
          alt="no-results"
          className="no-results-img"
        />
        <p className="no-results-msg">{`Your search for ${searchValue} did not find any matches`}</p>
      </div>
    )
  }

  renderMovies = () => {
    const {moviesList, noResults, isPagintion} = this.state
    return noResults ? (
      this.renderNoResults()
    ) : (
      <div className="popular-movies-container">
        <div className="popular-inner-movies-container">
          {moviesList.map(movie => {
            const {id} = movie
            const imagePath = movie.poster_path
            const imageUrl = `https://image.tmdb.org/t/p/original/${imagePath}`
            return imagePath !== null ? (
              <Link to={`/movies/${id}`} key={id}>
                <img
                  alt={movie.title}
                  src={imageUrl}
                  className="popular-movie-img"
                />
              </Link>
            ) : null
          })}
        </div>
        {isPagintion ? this.renderPagination() : null}
      </div>
    )
  }

  render() {
    const {isLoading, searchValue} = this.state
    return (
      <div className="popular-bg">
        <Header
          searchValue={searchValue}
          onValueChange={this.onSearchValueChange}
        />
        {isLoading ? this.renderLoader() : this.renderMovies()}
      </div>
    )
  }
}

export default Search
