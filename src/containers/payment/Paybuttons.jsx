import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ticket from '../../assest/ticket.jpg';
import './Payment.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Payment = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    axios.get('http://showz-backend.socialgear.co.uk/api/movies')
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

  const handleBookNow = () => {
    navigate('/Checkout'); // Redirect to the checkout page
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
            <button className="watch-trailer" onClick={handleBookNow}>BOOK NOW</button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Payment;
