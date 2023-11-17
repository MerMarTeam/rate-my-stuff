import axios from 'axios';
import { useState } from 'react';

function CreatePost(params) {
	const [title, setTitle] = useState('');

	const createAPI = 'https://bootcamp-json-server-backend.adaptable.app/posts';

	let handleSubmit = (event) => {
		event.preventDefault();

		let newObj = {
			title: title,
		};

		axios
			.post(createAPI, newObj)
			.then((response) => {
				console.log('Connection to API success.....!');
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	};

	return (
		<div className="create-page">
			<form onSubmit={handleSubmit}>
				<label htmlFor="title-input">Title: </label>
				<input
					id="title-input"
					type="text"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default CreatePost;
