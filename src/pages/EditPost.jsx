import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost(params) {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [fetching, setFetching] = useState(true);

	const postAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	let navigate = useNavigate();

	const { postId } = useParams();

	useEffect(() => {
		axios
			.get(`${postAPI}/${postId}`)
			.then((response) => {
				setTitle(response.data.title);
				setImage(response.data.image);
				setFetching(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let handleSubmit = (event) => {
		event.preventDefault();

		let requestBody = {
			title: title,
			image: image,
		};
		axios
			.put(`${postAPI}/${postId}`, requestBody)
			.then((response) => {
				console.log('Connection to API success.....!');
				setTitle(title);
				setImage(image);
				navigate(`/posts/${postId}`);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	};

	return (
		<div className="edit-page">
			{fetching ? (
				<h1>Loading...</h1>
			) : (
				<form onSubmit={handleSubmit}>
					<label>
						Title:
						<input
							type="text"
							name="title"
							value={title}
							onChange={(event) => {
								setTitle(event.target.value);
							}}
						/>
					</label>
					<br />
					<label>
						Link for Image:
						<input
							type="link"
							name="image"
							value={image}
							onChange={(event) => {
								setImage(event.target.value);
							}}
						/>
					</label>
					<br />
					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
}

export default EditPost;
