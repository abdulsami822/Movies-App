import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
  ],
}

class MovieSlider extends Component {
  render() {
    const {moviesList} = this.props
    return (
      <Slider {...settings}>
        {moviesList.map(movie => {
          const imagePath = movie.poster_path
          const imageUrl = `https://image.tmdb.org/t/p/original/${imagePath}`
          return (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <div className="react-slick-item">
                <img
                  alt="movie_poster"
                  className="trending-now-image"
                  src={imageUrl}
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }
}

export default MovieSlider
