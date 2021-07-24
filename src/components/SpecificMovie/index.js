import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import RelatedMovies from '../RelatedMovies'
import './index.css'

class SpecificMovie extends Component {
  state = {
    movieDetails: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({movieDetails: data, isLoading: false})
  }

  renderLoader = () => (
    <div className="pending-loader">
      <Loader type="TailSpin" height={35} width={35} color="red" />
    </div>
  )

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const {title, runtime, adult} = movieDetails
    let {overview} = movieDetails
    const releaseDate = movieDetails.release_date
    const releaseYear = new Date(releaseDate).getFullYear()
    const imagePath = movieDetails.backdrop_path
    const imageUrl = `https://image.tmdb.org/t/p/original/${imagePath}`
    overview = overview.slice(0, 100).concat('...')
    const durationHours = parseInt(runtime / 60, 10)
    const durationMins = runtime % 60
    const duration = `${durationHours}h ${durationMins}m`
    const certificate = adult ? 'UA' : 'U'
    return (
      <div
        style={{backgroundImage: `url("${imageUrl}")`}}
        className="specific-movie-container"
      >
        <h1 className="specific-movie-title">{title}</h1>
        <div className="specific-movie-details-container">
          <p className="specific-movie-duration">{duration}</p>
          <p className="specific-movie-certificate">{certificate}</p>
          <p className="specific-movie-year">{releaseYear}</p>
        </div>
        <p>{overview}</p>
        <button type="button" className="specific-play-btn">
          Play
        </button>
      </div>
    )
  }

  getLanguages = languageArr => {
    const languages = []
    languageArr.forEach(language => {
      languages.push(language.english_name)
    })
    return languages
  }

  getGenres = genresArr => {
    const genres = []
    genresArr.forEach(genre => {
      genres.push(genre.name)
    })
    return genres
  }

  renderMovieStats = () => {
    const {movieDetails} = this.state
    const {budget} = movieDetails
    const genres = this.getGenres(movieDetails.genres)
    const languages = this.getLanguages(movieDetails.spoken_languages)
    const releaseDate = movieDetails.release_date
    const ratingCount = movieDetails.vote_count
    const ratingAvg = movieDetails.vote_average
    return (
      <div className="stats-outer-container">
        <div className="stats-container">
          <h1 className="stats-heading">Genres</h1>
          {genres.map(genre => (
            <p key={genre} className="stats-value">
              {genre}
            </p>
          ))}
        </div>
        <div className="stats-container">
          <h1 className="stats-heading">Audio Available</h1>
          {languages.map(language => (
            <p key={language} className="stats-value">
              {language}
            </p>
          ))}
        </div>
        <div className="stats-container">
          <h1 className="stats-heading">Rating Count</h1>
          <p className="stats-value">{ratingCount}</p>
          <h1 className="stats-heading">Rating Average</h1>
          <p className="stats-value">{ratingAvg}</p>
        </div>
        <div className="stats-container">
          <h1 className="stats-heading">Budget</h1>
          <p className="stats-value">{budget}</p>
          <h1 className="stats-heading">Release Date</h1>
          <p className="stats-value">{releaseDate}</p>
        </div>
      </div>
    )
  }

  renderSection = () => {
    const {movieDetails} = this.state
    const {id} = movieDetails
    return (
      <>
        {this.renderMovieDetails()}
        {this.renderMovieStats()}
        <RelatedMovies movieId={id} />
        <Footer />
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="specific-movie-bg">
        {isLoading ? this.renderLoader() : this.renderSection()}
      </div>
    )
  }
}

export default SpecificMovie
