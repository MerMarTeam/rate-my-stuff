import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
	const [postsArray, setPostsArray] = useState([]);

	useEffect(() => {
		axios
			.get('https://bootcamp-json-server-backend.adaptable.app/posts')
			.then((response) => {
				console.log('Connection to API success.....!');
				setPostsArray(response.data);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}, []);
	return (
		<div>
			<h1>Posts</h1>
			{postsArray.map((post) => {
				return (
					<div>
						<Link to={`/post/${post.id}`}>
							<div className="post" key={post.id}>
								<h2>{post.title}</h2>
							</div>
							<br />
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
