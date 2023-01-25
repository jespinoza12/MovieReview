import Navbar from "./Navbar";
import "../public/Admin.css";

function Admin() {

  return(
    <>
      <Navbar />
      <div className='inner-col box' id='footer'>
        <div className='box'>
          <h1 className='box reviewsBox'>Users</h1>
          <div className='box'>
            <div className="table">
              <div>id</div>
              <div>username</div>
              <div>image of moview</div>
              <div>reviewHere</div>
              <input id="submitBtn" type="submit" value="Delete" />
            </div>     
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;