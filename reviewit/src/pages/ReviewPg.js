import Navbar from "./Navbar";
import '../public/ReviewPg.css';

function ReviewPg() {
  return(
    <>
      <Navbar />
      <div id='container' class='box'>
        <div id='box1' class='box'>Box 1</div>
        <div id='box2' class='box'>
            <div id= 'innerMenu1' class='box'>Menu 1</div>
            <div id= 'innerMenu2' class='box'>Menu 2</div>
            <div id= 'innerMenu3' class='box'>Menu 3</div>
            <div id= 'innerMenu4' class='box'>Menu 4</div>
            <div id= 'innerMenu5' class='box'>Menu 5</div>
        </div>
        <div id='box3' class='box'>
            <div id= 'menu1' class='box'>
                <div id= 'innerMenu1' class='box'>Menu 1</div>
                <div id= 'innerMenu2' class='box'>Menu 2</div>
                <div id= 'innerMenu3' class='box'>Menu 3</div>
                <div id= 'innerMenu4' class='box'>Menu 4</div>
            </div>
            <div id= 'menu2' class='box'>Box 4</div>
            <div id= 'menu3' class='box'>Box 5</div>
        </div>
        <div id='box4' class='box'>Box 6</div>
    </div>  
    </>
  );
}

export default ReviewPg;