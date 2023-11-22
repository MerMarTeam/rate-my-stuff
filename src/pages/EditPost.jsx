import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from './../api';

function EditPost(params) {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [fetching, setFetching] = useState(true);

	let navigate = useNavigate();

	const { postId } = useParams();

	useEffect(() => {
		api
			.get(`/posts/${postId}`)
			.then((response) => {
				setTitle(response.data.title);
				setImage(response.data.image);
				setDescription(response.data.description);
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
			description: description,
		};
		api
			.put(`/posts/${postId}`, requestBody)
			.then((response) => {
				console.log('Connection to API success.....!');
				setTitle(title);
				setImage(image);
				setDescription(description);
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
				else console.log('API: ', response);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	};

	return (
		<div className="edit-page">
			<div className="container">
				{fetching ? (
					<h1>Loading...</h1>
				) : (
					<>
						<form onSubmit={handleSubmit}>
							<div className="from-group">
								<label htmlFor="title-input" className="">
									Title:
								</label>
								<input
									type="text"
									name="title"
									id="title-input"
									className="form-control"
									value={title}
									onChange={(event) => {
										setTitle(event.target.value);
									}}
								/>
							</div>

							<br />

							<div className="form-group">
								<label htmlFor="image-input">Link for Image:</label>
								<input
									type="link"
									name="image"
									id="image-input"
									className="form-control"
									value={image}
									onChange={(event) => {
										setImage(event.target.value);
									}}
								/>
							</div>

							<br />

							<div className="form-group">
								<label htmlFor="description-input">Description:</label>
								<input
									type="text"
									name="description"
									id="description-input"
									className="form-control"
									value={description}
									onChange={(event) => {
										setDescription(event.target.value);
									}}
								/>
							</div>

							<br />

							<div className="row">
								<div className="col-md-6">
									<button className="btn btn-primary" type="submit">
										Submit
									</button>
								</div>
								<div className="col-md-6">
									<Link to="/">
										<button
											onClick={handleDelete}
											className="btn btn-danger float-end"
										>
											Delete
										</button>
									</Link>
								</div>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}

export default EditPost;
