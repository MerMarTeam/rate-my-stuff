import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../api'

function CreatePost(params) {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');

	let navigate = useNavigate();

	let handleSubmit = (event) => {
		event.preventDefault();

		let newObj = {
			title: title,
			image: image,
		};

		api
			.post('/posts', newObj)
			.then((response) => {
				console.log('Connection to API success.....!');
				console.log(response)
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
