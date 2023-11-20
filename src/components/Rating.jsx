import { useEffect, useState } from "react";
import api from './../api'

function Rating(props) {
    let [givenRating, setGivenRating] = useState()
    let [post, setPost] = useState()
    let [postRating, setPostRating] = useState([])

    useEffect(() => {
        getDataFromApi();
    }, []);

    function getDataFromApi() {
        api
            .get(`/posts/${props.postId}`)
            .then((response) => {
                console.log('API: getting posts success');
                setPost(response.data);
                if (response.data.rating) setPostRating(response.data.rating);

            })
            .catch((error) => {
                console.log('API: Connection Failed' + '  ' + error);
            });
    }

    function putDataToApi(newRatingArray) {
        let updatePost = {
            title: `${post.title}`,
            image: `${post.image}`,
            rating: newRatingArray
        };

        api
            .put(`/posts/${props.postId}`, updatePost)
            .then((response) => {
                console.log('API: putting new rating on a post');
            })
            .catch((error) => {
                console.log('API: Connection Failed' + '  ' + error);
            });
    }

    function handleStarClick(event) {

        let newRating = [...postRating];

        for (let i = 1; i <= 5; i++) {
            if (event.target.id == `rating-${i}`) newRating.push(i);
        }

        putDataToApi(newRating)


        // change the style of the stars
    }

    return (
        <div className='post-rating'>
            {postRating && <p>Rating: {postRating}</p>}
            <button id="rating-1" onClick={handleStarClick}>1</button>
            <button id="rating-2" onClick={handleStarClick}>2</button>
            <button id="rating-3" onClick={handleStarClick}>3</button>
            <button id="rating-4" onClick={handleStarClick}>4</button>
            <button id="rating-5" onClick={handleStarClick}>5</button>
            <p>Your rating: {givenRating}</p>
        </div>
    )
}

export default Rating;