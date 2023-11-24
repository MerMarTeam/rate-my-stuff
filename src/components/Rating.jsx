import { useEffect, useState } from "react";
import api from './../api'

function Rating(props) {
    let [givenRating, setGivenRating] = useState(0)
    let [averageRating, setAverageRating] = useState(0)

    const [star1Hovered, setStar1Hovered] = useState(false)
    const [star2Hovered, setStar2Hovered] = useState(false)
    const [star3Hovered, setStar3Hovered] = useState(false)
    const [star4Hovered, setStar4Hovered] = useState(false)
    const [star5Hovered, setStar5Hovered] = useState(false)

    const toggleHover1 = () => setStar1Hovered(!star1Hovered);
    const toggleHover2 = () => setStar2Hovered(!star2Hovered);
    const toggleHover3 = () => setStar3Hovered(!star3Hovered);
    const toggleHover4 = () => setStar4Hovered(!star4Hovered);
    const toggleHover5 = () => setStar5Hovered(!star5Hovered);

    useEffect(() => {
        if (props.post.ratings) {
            calculateAverageRating();
        }
    }, [givenRating]);

    function calculateAverageRating() {
        if (props.post.ratings) {
            let sum = 0;

            if (givenRating > 0) sum = givenRating;
            for (let i = 0; i < props.post.ratings.length; i++) {
                sum += props.post.ratings[i].starsCount
            }

            let average = 0;
            // If the user provided a new rating, we shall divide by one more
            if (givenRating > 0) {
                average = Math.ceil(sum / (props.post.ratings.length + 1));
            } else {
                average = Math.ceil(sum / props.post.ratings.length)
            }
            setAverageRating(average);
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

        props.postNewRating(newRatingObject);

        if (props.calculateTopFivePosts) props.calculateTopFivePosts();
    }

    function toggleCorrectHovers(id) {
        switch (id) {
            case 'rating-1':
                toggleHover1();
                break;
            case 'rating-2':
                toggleHover1();
                toggleHover2();
                break;
            case 'rating-3':
                toggleHover1();
                toggleHover2();
                toggleHover3();
                break;
            case 'rating-4':
                toggleHover1();
                toggleHover2();
                toggleHover3();
                toggleHover4();
                break;
            case 'rating-5':
                toggleHover1();
                toggleHover2();
                toggleHover3();
                toggleHover4();
                toggleHover5();
                break;
            default:
                break;
        }
    }

    function handleStarHover(event) {
        toggleCorrectHovers(event.target.id)
    }

    const starStyle = {
        marginLeft: '20px',
        marginRight: '20px',
    }

    return (

        <div className='post-rating'>
            <p>Average rating: {
                averageRating ? averageRating + " " + "(" + "out of" + " " + props.post.ratings.length + ")" : "no rating yet"
            }</p>

            <i id="rating-1" style={starStyle} onClick={handleStarClick} className={star1Hovered ? "bi bi-star-fill fa-2x" : "bi bi-star fa-2x"}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}>
            </i>
            <i id="rating-2" style={starStyle} onClick={handleStarClick} className={star2Hovered ? "bi bi-star-fill fa-2x" : "bi bi-star fa-2x"}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}>
            </i>
            <i id="rating-3" style={starStyle} onClick={handleStarClick} className={star3Hovered ? "bi bi-star-fill fa-2x" : "bi bi-star fa-2x"}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}>
            </i>
            <i id="rating-4" style={starStyle} onClick={handleStarClick} className={star4Hovered ? "bi bi-star-fill fa-2x" : "bi bi-star fa-2x"}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}>
            </i>
            <i id="rating-5" style={starStyle} onClick={handleStarClick} className={star5Hovered ? "bi bi-star-fill fa-2x" : "bi bi-star fa-2x"}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}>
            </i>

            <p>Given rating: {givenRating}</p>
        </div>
    )
}

export default Rating;