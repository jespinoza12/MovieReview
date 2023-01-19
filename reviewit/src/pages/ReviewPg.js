import Navbar from "./Navbar";
import '../public/ReviewPg.css';
import {useRef} from 'react';
import StarRating from "./StarsRating";

function ReviewPg() {

  const usernameref = useRef();

  function onSubmit (e){
    e.preventDefault();
    console.log({username: usernameref.current.value});
  }

  return(
    <>
      <Navbar />
        <div>
            <div className="container">
              <div className="box innerContainer">
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
                    <h1 className='box reviewsBox'>Reviews</h1>
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
                <div className="inner-col2 box innerContainer" id='aside'>
                  <div className='box'>
                    {/* <div className='box'> */}
                      <h1 className='box reviewBox'>Leave a comment</h1>
                    {/* </div> */}
                    
                    <div className='box form' onSubmit={onSubmit}>
                      
                        <label>Username:</label><br/>
                        <input id='usernameText' ref={usernameref} type="text" name="Username"/><br/>
                        <label>Review:</label><br/>
                        <textarea id='reviewText' type="text" name="Review"/><br/>
                        <StarRating /><br/>
                        <br/>
                        <input id="submitBtn" type="submit" value="Submit" />
                        {/* <Rating name="simple-controlled"/> */}
                        
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