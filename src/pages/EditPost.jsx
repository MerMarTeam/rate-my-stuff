import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from './../api'


function EditPost(params) {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [fetching, setFetching] = useState(true);


	let navigate = useNavigate();

	const { postId } = useParams();

	useEffect(() => {
		api
			.get(`/posts/${postId}`)
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
		api
			.put(`/posts/${postId}`, requestBody)
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

	let handleDelete = (event) => {
		api
			.delete(`/posts/${postId}`)
			.then((response) => {
				if (response.status == 200) console.log('API: delete post successful');
				else console.log("API: ", response)
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}

	return (
		<div className="edit-page">
			{fetching ? (
				<h1>Loading...</h1>
			) : (
				<>
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
						<button className="button" type="submit">
							Submit
						</button>
					</form>
					<button onClick={handleDelete}><Link to="/">Delete</Link></button>
				</>
			)}
		</div>
	);
}

export default EditPost;
