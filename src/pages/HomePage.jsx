import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api'

function HomePage() {
	const [postsArray, setPostsArray] = useState([]);

	function getPostsFromApi() {
		api
			.get('/posts')
			.then((response) => {
				console.log('API: getting posts success');
				setPostsArray(response.data);
			})
			.catch((error) => {
				console.log('API: Connection Failed' + '  ' + error);
			});
	}

	useEffect(() => {
		getPostsFromApi();
	}, []);

	return (
		<div>
			<h1>Posts</h1>
			{postsArray.map((post, i) => {
				return (
					<div key={post.id} className="post">
						<Link to={`/posts/${post.id}`}>
							<h2>{post.title}</h2>
							<img src={post.image} alt="" />
						</Link>
					</div>
				);
			})}
			<br />
			<button>
				<Link to="/create">Create Post</Link>
			</button>
		</div>
	);
}

export default HomePage;
