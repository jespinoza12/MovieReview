import '../public/StarsRating.css';

function StarRating(){
  return(
    <>
      <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5"/>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4"/>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3"/>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2"/>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1"/>
      </div>
      <br/>
    </>
  );
}

export default StarRating;