import {Component} from 'react'
import MovieSlider from '../MovieSlider'
import './index.css'

class HomeMovies extends Component {
  render() {
    const {
      trendingMoviesList,
      originalsMoviesList,
      popularMoviesList,
    } = this.props
    return (
      <>
        <div className="trending-container">
          <h1 className="trending-now-heading">Trending Now</h1>
          <div className="trending-slider-container">
            <MovieSlider moviesList={trendingMoviesList} />
          </div>
        </div>
        <div className="trending-container">
          <h1 className="trending-now-heading">Popular</h1>
          <div className="trending-slider-container">
            <MovieSlider moviesList={popularMoviesList} />
          </div>
        </div>
        <div className="trending-container">
          <h1 className="trending-now-heading">Original</h1>
          <div className="trending-slider-container">
            <MovieSlider moviesList={originalsMoviesList} />
          </div>
        </div>
      </>
    )
  }
}

export default HomeMovies
