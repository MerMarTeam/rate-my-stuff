import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DetailPost() {
	let { postId } = useParams();

	const [fetching, setFetching] = useState(true);

	const createAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	const [postObj, setPostObj] = useState();

	useEffect(() => {
		getDataFromAPI();
	}, [postId]);

	function getDataFromAPI() {
		axios
			.get(`${createAPI}/${postId}`)
			.then((response) => {
				console.log('Connection to API success.....!');
				setPostObj(response.data);
				setFetching(false);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
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
