import {Component} from 'react'
import Loader from 'react-loader-spinner'
import HomeMovies from '../HomeMovies'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {
    mainMovieImage: '',
    mainMovieTitle: '',
    mainMovieDesc: '',
    trendingMoviesList: [],
    popularMoviesList: [],
    originalsMoviesList: [],
    isLoading: true,
  }

  async componentDidMount() {
    await this.getTrendingMovies()
    await this.getPopularMovies()
    await this.getOriginalMovies()
    await this.getFirstMovie()
    this.loadingFinished()
  }

  getFirstMovie = async () => {
    const {trendingMoviesList} = this.state
    const movieId = trendingMoviesList[0].id
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      mainMovieImage: data.backdrop_path,
      mainMovieTitle: data.original_title,
      mainMovieDesc: data.overview,
    })
  }

  getTrendingMovies = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API}`
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    this.setState({trendingMoviesList: results})
  }

  getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    this.setState({popularMoviesList: results})
  }

  getOriginalMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API}`
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    this.setState({originalsMoviesList: results})
  }

  loadingFinished = () => {
    this.setState({isLoading: false})
  }

  renderLoader = () => (
    <div className="pending-loader">
      <Loader type="TailSpin" height={35} width={35} color="red" />
    </div>
  )

  renderContent = () => {
    const {
      mainMovieTitle,
      mainMovieDesc,
      mainMovieImage,
      trendingMoviesList,
      popularMoviesList,
      originalsMoviesList,
    } = this.state
    const mainMovieImageFull = `https://image.tmdb.org/t/p/original/${mainMovieImage}`
    return (
      <>
        <div
          style={{backgroundImage: `url("${mainMovieImageFull}")`}}
          className="main-movie-container"
        >
          <h1>{mainMovieTitle}</h1>
          <p>{mainMovieDesc}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
        <HomeMovies
          trendingMoviesList={trendingMoviesList}
          popularMoviesList={popularMoviesList}
          originalsMoviesList={originalsMoviesList}
        />
        <Footer />
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-bg">
        {isLoading ? this.renderLoader() : this.renderContent()}
      </div>
    )
  }
}

export default Home
