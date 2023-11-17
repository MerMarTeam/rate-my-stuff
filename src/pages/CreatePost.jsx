import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost(params) {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');

	const createAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	let navigate = useNavigate();

	let handleSubmit = (event) => {
		event.preventDefault();

		let newObj = {
			title: title,
			image: image,
		};

		axios
			.post(createAPI, newObj)
			.then((response) => {
				console.log('Connection to API success.....!');
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});

		navigate('/');
	};

	return (
		<div className="create-page">
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input
						type="text"
						name="title"
						placeholder="Enter your title here."
						required={true}
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
						placeholder="Enter link of your Image"
						required={true}
						value={image}
						onChange={(event) => {
							setImage(event.target.value);
						}}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CreatePost;
