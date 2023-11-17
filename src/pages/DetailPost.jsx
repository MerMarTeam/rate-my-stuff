import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DetailPost() {
	let { postId } = useParams();

	const createAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	const [postObj, setPostObj] = useState(null);

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
	}, [postId]);

	return (
		<>
			{postObj && (
				<div className="detail-post">
					<h1>{postObj.title}</h1>
					<br />
					<img src={postObj.image} alt="" />
					<br />
					<button>
						<a href={`/edit/${postId}`}>Edit</a>
					</button>
				</div>
			)}
		</>
	);
}

export default DetailPost;
