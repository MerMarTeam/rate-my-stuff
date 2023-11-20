import { useEffect, useState } from "react";
import api from './../api'

function Rating(props) {
    let [givenRating, setGivenRating] = useState(0)

    let [postRatings, setPostRatings] = useState([])

    let [averageRating, setAverageRating] = useState(0)

    function calculateAverageRating() {
        let sum = 0;

        if (givenRating > 0) sum = givenRating;

        for (let i = 0; i < postRatings.length; i++) {
            sum += postRatings[i].starsCount
        }

        let average;
        // If the user provided a new rating, we shall divide by one more
        if (givenRating > 0) {
            average = Math.ceil(sum / (postRatings.length + 1));
        } else {
            average = Math.ceil(sum / postRatings.length)
        }
        setAverageRating(average)
    }

    function getDataFromApi() {
        api
            .get(`/posts/${props.postId}/ratings`)
            .then((response) => {
                console.log('API: getting posts success');
                setPostRatings(response.data);

            })
            .catch((error) => {
                console.log('API: Connection Failed' + '  ' + error);
            });
    }

    function putDataToApi(newRatingNumber) {
        let newRatingObject = {
            // TODO when user auth works
            // "userId": 1,
            starsCount: newRatingNumber,
            postId: props.postId,
        };

        api
            .post(`/posts/${props.postId}/ratings`, newRatingObject)
            .then((response) => {
                console.log('API: putting new rating on a post');
            })
            .catch((error) => {
                console.log('API: Connection Failed' + '  ' + error);
            });
    }

    function handleStarClick(event) {
        let userRating = 0;
        for (let i = 1; i <= 5; i++) {
            if (event.target.id == `rating-${i}`) userRating = i;
        }
        putDataToApi(userRating);
        setGivenRating(userRating);
        getDataFromApi(); // important to have here, even if the very first time user gives rating it does not work
        // TODO: change the style of the stars depending on which rating button is clicked
    }

    useEffect(() => {
        getDataFromApi();
    }, []);

    useEffect(() => {
        if (postRatings.length) {
            calculateAverageRating();
        }
    }, [postRatings, givenRating]);

    return (

        <div className='post-rating'>
            <p>Average rating: {
                averageRating == 0 ? "no rating yet" : averageRating
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