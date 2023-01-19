import '../public/StarsRating.css';

function StarRating(){
  return(
    <>
      <div class="rate">
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text"/>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text"/>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text"/>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text"/>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text"/>
      </div>
      <br/>
    </>
  );
}

export default StarRating;