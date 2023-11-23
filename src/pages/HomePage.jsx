import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api';
import Rating from '../components/Rating';

function HomePage() {
	const [postsArray, setPostsArray] = useState([]);

	function getPostsFromApi() {
		api
			.get('/posts?_embed=ratings&_embed=comments')
			.then((response) => {
				console.log('API: getting posts success');
				console.log('----------------------------------', response.data);
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
				getPostsFromApi();
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
				{[...postsArray].reverse().map((post, i) => {
					return (

						<div key={post.id} className="post">

							<Link to={`/posts/${post.id}`}>
								<h2>{post.title}</h2>
								<img src={post.image} alt="" />
							</Link>

							<dl className="description">{post.description}</dl>

							<div className='comments-count'>
								<i className="fa-regular fa-comments fa-2xl" style={{ color: "#ffffff" }}
									onMouseEnter={(event) => { event.target.className = "fa-regular fa-comments fa-2xl fa-beat" }}
									onMouseLeave={(event) => { event.target.className = "fa-regular fa-comments fa-2xl" }}
								>
								</i>
								<h3 style={{ display: 'inline', marginLeft: '10px' }}>{post.comments.length}</h3>
							</div>

							<Rating post={post} postNewRating={postNewRating} />
						</div>

					);
				})}
				<br />
				<Link to="/create">
					<button className="button">Create Post</button>
				</Link>
			</div>
			<div className="side-panel row aside">
				<section>
					<h3>Who are we?</h3>
					<p>
						We are Marat & Mert and this is our second project for Ironhack
						Fullstack Web Development Course!
					</p>
				</section>
				<section>
					<h3>What is Rate My Stuff?</h3>
					<p>
						Welcome to RMS, your go-to platform for sharing and celebrating the
						things that matter to you! Upload your favorite images and let the
						community weigh in with votes and comments. Whether it's your latest
						DIY project, a stunning travel photo, or anything else you're proud
						of, "Rate My Stuff" is the place to showcase your creations and
						gather feedback from a supportive community. Join us in fostering a
						vibrant space for creativity, inspiration, and friendly
						interactions. Start uploading, voting, and engaging today!
					</p>
				</section>
				<section>
					<h3>Top Rated Posts</h3>
					<ul>
						<li>Test</li>
						<li>Test</li>
						<li>Test</li>
						<li>Test</li>
					</ul>
				</section>
			</div>
		</div>
	);
}

export default HomePage;
