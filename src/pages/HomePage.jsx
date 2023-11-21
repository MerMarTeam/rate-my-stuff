import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api'
import Rating from '../components/Rating';

function HomePage() {
	const [postsArray, setPostsArray] = useState([]);

	function getPostsFromApi() {
		api
			// .get('/posts')
			.get('/posts?_embed=ratings')
			.then((response) => {
				console.log('API: getting posts success');
				console.log('----------------------------------', response.data)
				setPostsArray(response.data);
			})
			.catch((error) => {
				console.log('API: Connection Failed' + '  ' + error);
			});
	}

	function postNewRating(ratingObject) {
		api
			.post(`/ratings`, ratingObject, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log('API: putting new rating on a post');
			})
			.catch((error) => {
				console.log('API: Connection Failed' + '  ' + error);
			});
	}

	useEffect(() => {
		getPostsFromApi();
	}, []);

	return (
		<div className="parent-div">
			<div className="homepage">
				<div className="title">
					<h1>Stuffs to Rate</h1>
				</div>
				{postsArray.map((post, i) => {
					return (
						<div key={post.id} className="post">
							<Link to={`/posts/${post.id}`}>
								<h2>{post.title}</h2>
								<img src={post.image} alt="" />
							</Link>
							{/* <Rating postId={post.id} /> */}
							<Rating post={post} postNewRating={postNewRating} />
						</div>
					);
				})}
				<br />
				<Link to="/create">
					<button className="button">Create Post</button>
				</Link>
			</div>
			<div className="side-panel">
				<section>
					<h3>Test</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
						doloribus ea voluptatum animi, neque totam natus nemo expedita
						repellendus illum?
					</p>
				</section>
				<section>
					<h3>Test 2</h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident,
						assumenda?
					</p>
				</section>
			</div>
		</div>
	);
}

export default HomePage;
