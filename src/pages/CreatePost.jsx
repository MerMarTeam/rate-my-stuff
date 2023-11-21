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
				// TODO: handle unauthorized response 401
				console.log('Connection to API success.....!');
				console.log(response)
				navigate('/');
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});


	};

	return (
		<div className="create-page">
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type="text"
							name="title"
							placeholder="Enter your title here."
							id='title-input'
							className='form-control'
							required={true}
							value={title}
							onChange={(event) => {
								setTitle(event.target.value);
							}}
						/>
					</div>
					<br />
					<div className='form-group'>
						<input
							type="link"
							name="image"
							placeholder="Enter link of your Image"
							className='form-control'
							required={true}
							value={image}
							onChange={(event) => {
								setImage(event.target.value);
							}}
						/>
					</div>
					<br />
					<button type="submit" className='btn btn-primary'>Submit</button>

				</form>
			</div>
		</div>
	);
}

export default CreatePost;
