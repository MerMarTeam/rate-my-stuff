import { useEffect, useState } from "react";
import api from './../api'

function Rating(props) {
    let [givenRating, setGivenRating] = useState(0)
    let [averageRating, setAverageRating] = useState(0)

    function calculateAverageRating() {
        if (props.post.ratings) {
            let sum = 0;
            
            if (givenRating > 0) sum = givenRating;
            for (let i = 0; i < props.post.ratings.length; i++) {
                sum += props.post.ratings[i].starsCount
            }

            let average;
            // If the user provided a new rating, we shall divide by one more
            if (givenRating > 0) {
                average = Math.ceil(sum / (props.post.ratings.length + 1));
            } else {
                average = Math.ceil(sum / props.post.ratings.length)
            }
            setAverageRating(average)
        }
    }

    function handleStarClick(event) {
        let userRating = 0;
        for (let i = 1; i <= 5; i++) {
            if (event.target.id == `rating-${i}`) userRating = i;
        }

        setGivenRating(userRating);

        let newRatingObject = {
            starsCount: userRating,
            postId: props.post.id
        }
        props.postNewRating(newRatingObject)

        // TODO: change the style of the stars depending on which rating button is clicked
    }

    useEffect(() => {

        if (props.post.ratings) {
            calculateAverageRating();
        }
    }, [givenRating]);

    return (

        <div className='post-rating'>
            <p>Average rating: {
                averageRating ? averageRating : "no rating yet"
            }</p>
            <button id="rating-1" onClick={handleStarClick}>1</button>
            <button id="rating-2" onClick={handleStarClick}>2</button>
            <button id="rating-3" onClick={handleStarClick}>3</button>
            <button id="rating-4" onClick={handleStarClick}>4</button>
            <button id="rating-5" onClick={handleStarClick}>5</button>
            <p>Given rating: {givenRating}</p>
        </div>
    )
}

export default Rating;