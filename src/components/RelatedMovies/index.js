import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

class RelatedMovies extends Component {
  state = {
    relatedMoviesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getRelatedMovies()
  }

  getRelatedMovies = async () => {
    const {movieId} = this.props
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    this.setState({relatedMoviesList: results.slice(0, 5), isLoading: false})
  }

  renderLoader = () => (
    <Loader type="TailSpin" height={35} width={35} color="red" />
  )

  renderMovie = () => {
    const {relatedMoviesList} = this.state
    const {history} = this.props
    return (
      <div className="related-movies-container">
        <h1 className="related-movies-heading">More like this</h1>
        <div className="related-images-container">
          {relatedMoviesList.map(movie => {
            const imagePath = movie.poster_path
            const imageUrl = `https://image.tmdb.org/t/p/original/${imagePath}`
            return (
              <img
                src={imageUrl}
                alt="related-movie"
                className="related-movie-image"
                key={movie.id}
                onClick={() => {
                  history.push(`/movies/${movie.id}`)
                  history.go(0)
                }}
              />
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderMovie()
  }
}

export default withRouter(RelatedMovies)
