import Navbar from "./Navbar";
import "../public/AdvSrchResPg.css";

function AdvSrchResPg() {

  return(
    <>
      <Navbar />
      <div className='inner-col box' id='footer'>
        <div className='box'>
          <h1 className='box reviewsBox'>Tearm Searched</h1>
          <div className='box'>
            <div className="table">
              <div>image of movie</div>
              <div>title of movie</div>
              <div></div>
              <input id="submitBtn" type="submit" value="Review" />
            </div>     
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvSrchResPg;