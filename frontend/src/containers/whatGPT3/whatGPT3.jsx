import React from 'react';
import './whatGPT3.css';
import movie from '../../assest/movie.jpg'
import movie1 from '../../assest/movie1.jpg'
import movie2 from '../../assest/movie2.jpg'
import movie3 from '../../assest/movie3.jpg'
import movie4 from '../../assest/movie4.jpg'
import movie5 from '../../assest/movie5.jpg'
import movie6 from '../../assest/movie6.jpg'
import movie7 from '../../assest/movie7.jpg'
import upcoming1 from '../../assest/upcoming1.jpg'
import upcoming2 from '../../assest/upcoming2.jpg'
import upcoming3 from '../../assest/upcoming3.jpg'
import upcoming4 from '../../assest/upcoming4.jpg'
import upcoming5 from '../../assest/upcoming5.jpg'
import upcoming6 from '../../assest/upcoming6.png'
import HoverCarousel from "hover-carousel";
import { Link } from 'react-router-dom';

const WhatGPT3 = () => {

    const images = [
        upcoming1,
        upcoming5,
        upcoming4,
        upcoming2,
        upcoming3,
        upcoming6
      ];

  return (
    <section id='wgpt3' className="product1 section-p1" >
        <div className="topic"><h1>Now Showing Movies</h1></div>
        <div className='pro-container'>
          <div className='pro'>
          <form>
            <img src={movie1} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>WENDY</h1>
                    <h5 className='h5'>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/KKktQFFcXL0?si=IbHyLVpwoYXUSY2O' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>ANTMAN-WASP</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/uwTCzJkCRpY?si=5i00-JIlkxpKNNAn' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie2} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>BARBIE</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/pBk4NYhWNMM?si=e9srw1OcapdhyCzO' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie3} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>GRAN-TURISMO</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/GVPzGBvPrzw?si=6yXiuSLZg3wqBUTH' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie4} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>BLUE-BEETLE</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/vS3_72Gb-bI?si=1oEk3fI24BY96W9w' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie5} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>EXPEND 4 BLES</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/DhlaBO-SwVE?si=SY5gto8OifEqJCgE' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie6} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>OPPENHEIMER</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/uYPbbksJxIg?si=bogTRQ1Vj9AFrCRt' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>

          <div className='pro'>
          <form>
            <img src={movie7} className="img-responsive" alt=''/>
                <div className="des">
                    <h1>MEG 2 (3D)</h1>
                    <h5>2020 . 1hr 51min . Fantasy</h5>

                    <div className='btn-two'>
                        <div className="btn-watch">
                            <a href='https://youtu.be/dG91B3hHyY4?si=inykIsBF8bCSCKLg' target="_blank" rel="noopener noreferrer">
                                <button type='button'>Watch Trailer</button>
                            </a>
                        </div>

                        <div className="btn-book">
                            <button type='button'><Link to='/seatBooking'>Buy Tickets</Link></button>
                        </div>
                    </div>  
                  </div>
                </form>
          </div>
        </div>
        <div className="topic last"><h1>Upcoming Movies</h1></div>
        <div className='Carousel'>
            <HoverCarousel images={images} />
        </div>
    </section>
  )
}

export default WhatGPT3;