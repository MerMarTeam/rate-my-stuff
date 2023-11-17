import axios from 'axios';
import { useEffect, useState } from 'react';

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
					<div className="post" key={post.id}>
						<h1>{post.title}</h1>
					</div>
				);
			})}
			<button>
				<a href="/create">Create</a>
			</button>
		</div>
	);
}

export default HomePage;
