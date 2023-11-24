import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './../api';
import Rating from '../components/Rating';

function HomePage() {
	const [postsArray, setPostsArray] = useState([]);
	const [topFive, setTopFive] = useState([])

	useEffect(() => {
		getPostsFromApi();
	}, []);

	useEffect(() => {
		calculateTopFivePosts()
	}, [postsArray])

	function calculateTopFivePosts() {
		let postsIdsWithAverages = []
		if (postsArray.length > 0) {
			postsArray.forEach((post) => {
				let sum = 0;
				for (let i = 0; i < post.ratings.length; i++) {
					sum += post.ratings[i].starsCount
				}
				let average = Math.ceil(sum / post.ratings.length)
				postsIdsWithAverages.push({ id: post.id, title: post.title, average: average })
			})
			let tempFive = [...postsIdsWithAverages].sort((a, b) => b.average - a.average).slice(0, 5)
			setTopFive(tempFive);
		}
	}

	function getPostsFromApi() {
		api
			.get('/posts?_embed=ratings&_embed=comments')
			.then((response) => {
				console.log('API: getting posts success');
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

	return (
		<div className="parent-div">
			<div className="homepage">
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

							<Rating post={post} postNewRating={postNewRating} calculateTopFivePosts={calculateTopFivePosts} />

							<div className="comments-count">
								<Link to={`/posts/${post.id}`}>
									<i
										className="fa-regular fa-comments fa-xl"
										style={{ color: '#ffffff' }}
										onMouseEnter={(event) => {
											event.target.className =
												'fa-regular fa-comments fa-xl fa-beat';
										}}
										onMouseLeave={(event) => {
											event.target.className = 'fa-regular fa-comments fa-xl';
										}}
									></i>
									<h4
										style={{
											display: 'inline',
											textDecoration: 'none',
											color: 'white',
											marginLeft: '10px',
										}}
									>
										{post.comments.length}
									</h4>
								</Link>
							</div>
						</div>
					);
				})}
				<br />
				<Link to="/create">
					<button id="create-post-button" className="btn btn-primary btn-circle">
						<p>+</p>
					</button>
				</Link>

			</div>
			<div className="side-panel">
				<section>
					<h3>Top 5 Posts</h3>
					<ul className='top-five-list'>
						{topFive && topFive.map((post) => {
							return (
								<li key={post.id} className=''>
									<Link to={`/posts/${post.id}`}>
										{post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title}
									</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
		</div >
	);
}

export default HomePage;
