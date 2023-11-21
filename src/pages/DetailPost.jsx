import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './../api'
import Rating from '../components/Rating';

function DetailPost() {
	let { postId } = useParams();

	const [fetching, setFetching] = useState(true);

	const [postObj, setPostObj] = useState();

	const [comments, setComments] = useState();

	useEffect(() => {
		getPostsWithRatingsFromAPI();
		getCommentsFromAPI();
	}, [postId]);

	function getPostsWithRatingsFromAPI() {
		api
			.get(`/posts/${postId}?_embed=ratings`)
			.then((response) => {
				console.log('Connection to API success.....!');
				setPostObj(response.data);
				setFetching(false);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}

	function postNewRating(ratingObject) {
		api
			.post(`/ratings`, ratingObject, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log('API: putting new rating on a post');
			})
			.catch((error) => {
				console.log('API: Connection Failed' + '  ' + error);
			});

		getPostsWithRatingsFromAPI();
	}

	function getCommentsFromAPI() {
		api
			.get(`/posts/${postId}/comments`)
			.then((response) => {
				console.log('API: Gettings comments successfull');
				setComments(response.data);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}

	const commentStyle = {
		border: "1px solid white",
		padding: '20px'
	}

	return (
		<>
			{fetching ? (
				<p>Loading....</p>
			) : (
				<div className="detail-post">
					<h1>{postObj.title}</h1>
					<br />
					<img src={postObj.image} alt="" />
					<Rating post={postObj} postNewRating={postNewRating} />
					<br />
					<Link className="button" to={`/edit/${postId}`}>
						<button>Edit</button>
					</Link>
					<div>
						<h2>Comments</h2>
						{comments && comments.map((comment) => {
							return (
								<div style={commentStyle} key={comment.id}>{comment.text}</div>
							)
						})}
					</div>
				</div>
			)}
		</>
	);
}

export default DetailPost;
