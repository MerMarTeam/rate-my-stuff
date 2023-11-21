import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './../api'
import Rating from '../components/Rating';

function DetailPost() {
	let { postId } = useParams();

	const [fetching, setFetching] = useState(true);

	const [postObj, setPostObj] = useState();

	useEffect(() => {
		getDataFromAPI();
	}, [postId]);

	function getDataFromAPI() {
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

		getDataFromAPI();
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

				</div>
			)}
		</>
	);
}

export default DetailPost;
