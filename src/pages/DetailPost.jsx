import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DetailPost() {
	let { postId } = useParams();

	const createAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	const [postObj, setPostObj] = useState('');

	useEffect(() => {
		axios
			.get(`${createAPI}/${postId}`)
			.then((response) => {
				console.log('Connection to API success.....!');
				setPostObj(response.data);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}, []);

	return (
		<div className="detail-post">
			<h1>{postObj.title}</h1>
			<button>
				<a href="/edit/placeholder">Edit</a>
			</button>
		</div>
	);
}

export default DetailPost;
