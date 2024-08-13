import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import axios from 'axios';
import ticket from '../../assest/ticket.jpg';
import './Payment.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Payment = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the movie data!", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true 
  };

  return (
    <div className='payment-container'>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <Slider {...settings}>
            {movies.map(movie => (
              <div key={movie.id} className='payment-image'>
                <img src={movie.picture} alt={movie.title} />
              </div>
            ))}
          </Slider>
        </Col>
        <Col span={24} md={12} className="centered-col">
          <div className="movie-actions frame">
            <img src={ticket} alt="Ticket" className="ticketImg" />
            <button className="watch-trailer">BOOK NOW</button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Payment;
