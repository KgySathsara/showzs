import React from 'react'
import Navbar from '../components/navbar/NavbarSeat';
import './styles.css';
import './script';
import Footer from '../containers/footer/Footer';

const seatBooking = () => {

  let d = new Date();
  let day = d.getDay();
  
  let tomorrow = day+1;
  let nextday = day+2;
  let nextdayAfter = day+3;

  let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] 

  tomorrow = weekday[tomorrow];
  nextday = weekday[nextday];
  nextdayAfter = weekday[nextdayAfter];
  

  function validateInput(){
    var userInput = document.getElementById("userInput").value;
            
            if (userInput > 5) {
                alert("Error: Maximum number allowed is 5.");
                document.getElementById("userInput").value = ""; 
            }

            else if(userInput <= 0){
                alert("Error: You need to select more than 1.");
                document.getElementById("userInput").value = "";
            }
  }

  return (
    <div className='main'>
        <Navbar/>
        <div className='banner'>
            <section id="banner" class="section-m1">
                <h4>New Offer</h4>
                <h2>Up to <span>15% off</span> - Online Ticket Booking</h2>
            </section>
        </div>
        
        <div className='container'>
            <div className="first-section">
                <h1>Book a Cinema</h1>

                <div className='date'>
                    <h3>Select a Date  </h3>
                  
                    <select id="movie">
                      <option>Today</option>
                      <option>{tomorrow}</option>
                      <option>{nextday}</option>
                      <option>{nextdayAfter}</option>
                    </select>
                </div>

                <div className='date'>
                    <h3>Select a Time  </h3>

                    <select id="movie">
                      <option>10.30 am</option>
                      <option>1 pm</option>
                      <option>4.45 pm</option>
                    </select>
                </div>

                <div className='date'>
                    <h3>Select cinema</h3>

                    <select id="movie">
                      <option>Cinema 01</option>
                      <option>Cinema 02</option>
                      <option>Cinema 03</option>
                    </select>
                </div>
            </div>

            <div className="second-section">
                <h1>Your Details</h1>

                <div className='name'>
                    <h3>Enter Name</h3>

                    <div className='type'>
                        <input type="text" placeholder='Example :- Dimantha'></input>
                    </div>
                </div>

                <div className='name'>
                  <h3>Enter Email</h3>

                  <div className='type'>
                      <input type="text" placeholder='test@gmail.com'></input>
                  </div>
                </div>

                <div className='name'>
                  <h3>Contact No</h3>

                  <div className='type'>
                      <input type="text" placeholder='+94-XXXXXXXX'></input>
                  </div>
                </div>
            </div>
        </div>

        <div className="hero">
          <h1>Arange Seats</h1>
            <div className='movie-container'>
              <label>Pick a movie</label>

              <select id="movie">
                <option ticketPrice="10">WENDY</option>
                <option ticketPrice="10">ANTMAN-WASP</option>
                <option ticketPrice="10">GRAN-TURISMO</option>
                <option ticketPrice="10">BLUE-BEETLE</option>
                <option ticketPrice="10">EXPEND 4 BLES</option>
                <option ticketPrice="10">OPPENHEIMER</option>
                <option ticketPrice="10">MEG 2 (3D)</option>
              </select>
            </div>

            <div className='movie-container2' data-validate = "Maximim Seats that you can book is 5.">
              <label>No of seats</label>

              <input type='text' id='userInput' onBlur={validateInput}></input>
            </div>

            <ul className="showcase">
              <li>
                <div className='seat'></div>
                <small>N/A</small>
              </li>

              <li>
                <div className='seat selected'></div>
                <small>Selected</small>
              </li>

              <li>
                <div className='seat occupied'></div>
                <small>Occupied</small>
              </li>
            </ul>

            <div className="screen-container">
              <div className="screen"></div>
              <div className="row">
                <div className="seat"></div>
                <div className="seat occupied"></div>
                <div className="seat"></div>
                <div className="seat occupied"></div>
                <div className="seat"></div>
              </div>

              <div className="row">
                <div className="seat"></div>
                <div className="seat occupied"></div>
                <div className="seat occupied"></div>
                <div className="seat"></div>
                <div className="seat"></div>
              </div>

              <div className="row">
                <div className="seat occupied"></div>
                <div className="seat"></div>
                <div className="seat"></div>
                <div className="seat"></div>
                <div className="seat"></div>
              </div>

              <div className="row">
                <div className="seat"></div>
                <div className="seat"></div>
                <div className="seat"></div>
                <div className="seat occupied"></div>
                <div className="seat occupied"></div>
              </div>
            </div>

            <p className='text'>
                You have selected <span id='count'>0</span> seats for price of $ <span id="total">0</span>
            </p>
        </div>

        <div className='btn-submit'>
          <button>Pay Now</button>
        </div>

        <Footer/>
    </div>
  )
}

export default seatBooking