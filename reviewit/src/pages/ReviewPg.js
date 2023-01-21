import Navbar from "./Navbar";
import '../public/ReviewPg.css';
import {useRef} from 'react';

function ReviewPg() {

  const emailref = useRef();

  function onSubmit (e){
    e.preventDefault();
    console.log({email: emailref.current.value});
  }

  return(
    <>
      <Navbar />
        <div className='outContainer'>
            <div className="container innerContainer">
              <div className="box">
    	          <div className='inner-col box' id='article'>
                  <div className="box out-image">
                    <div className="box abov-image">
                      image
                    </div>
                    <div className="box und-image">
                      info about the movie
                    </div>
                  </div>
                  <div className="box">
                    <div className='box desc'>
                      Description will go here
                    </div>
                  </div>

                </div>
  		          <div className='inner-col box' id='footer'>
                  <div className='box'>
                    <h1 className='box'>Reviews</h1>
                    <div className='box'>
                      <div className="table">
                        <div>id</div>
                        <div>reviewHere</div>
                        <div>Stars</div>
                      </div>
                        
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="inner-col2 box"> */}
                <div className="inner-col2 box" id='aside'>
                  <div className='box'>
                    {/* <div className='box'> */}
                      <h1 className='box'>Title</h1>
                    {/* </div> */}
                    
                    <div className='box form' onSubmit={onSubmit}>
                      
                        <label>Email:</label><br/>
                        <input id='emailText' ref={emailref} type="text" name="Email"/><br/>
                        <label>Review:</label><br/>
                        <textarea id='reviewText' type="text" name="Review"/><br/>
                        <input id="submitBtn" type="submit" value="Login" />
                      
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </div>
        </div>
    </>
  );
}

export default ReviewPg;