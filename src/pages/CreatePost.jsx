import { useState } from 'react';

function CreatePost(params) {
	const [title, setTitle] = useState('');

	let handleSubmit = (event) => {
		event.preventDefault();
		console.log(title);
	};

	return (
		<div className="create-page">
			<h1>The new title is: {title}</h1>
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
