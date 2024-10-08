import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Slider from "react-slick";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ticket from '../../assest/ticket.jpg';
import './Payment.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Payment = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        axios.get('http://showz-backend.socialgear.co.uk/api/live-events/showEvent')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the event data!", error);
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
                        {events.map(event => (
                            <div key={event.id} className='payment-image'>
                                <img src={event.coverImage} alt={event.title} className='slider-image' />
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
