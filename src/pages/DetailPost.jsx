import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './../api';
import Rating from '../components/Rating';

function DetailPost() {
	let { postId } = useParams();

	const [fetching, setFetching] = useState(true);

	const [postObj, setPostObj] = useState();

	const [comments, setComments] = useState();

	const [commentText, setCommentText] = useState('');

	useEffect(() => {
		getPostsWithRatingsFromAPI();
		getCommentsFromAPI();
	}, [postId]);

	function getPostsWithRatingsFromAPI() {
		api
			.get(`/posts/${postId}?_embed=ratings`)
			.then((response) => {
				console.log('Connection to API success.....!');
				setPostObj(response.data);
				setFetching(false);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
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

		getPostsWithRatingsFromAPI();
	}

	function getCommentsFromAPI() {
		api
			.get(`/posts/${postId}/comments`)
			.then((response) => {
				console.log('API: Gettings comments successfull');
				setComments(response.data);
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});
	}

	function handleCommentSubmit(event) {
		event.preventDefault();

		const currentTime = new Date();
		let newCommentObject = {
			text: commentText,
			postId: parseInt(postId),
			date: currentTime.toLocaleString(),
		};

		api
			.post(`/comments`, newCommentObject)
			.then((response) => {
				console.log('API: sending new comment successfull');
			})
			.catch((error) => {
				console.log('Connection Failed' + '  ' + error);
			});

		getCommentsFromAPI();
		setCommentText('');
	}

	const handleTextareaChange = (event) => {
		setCommentText(event.target.value);
	};

	const commentStyle = {
		border: '1px solid white',
		padding: '20px',
	};

	return (
		<>
			{fetching ? (
				<p>Loading....</p>
			) : (
				<div className="detail-post">
					<h1>{postObj.title}</h1>
					<br />
					<img src={postObj.image} alt="" />
					<dl className="description-detail">{postObj.description}</dl>
					<Rating post={postObj} postNewRating={postNewRating} />
					<br />
					<Link className="button" to={`/edit/${postId}`}>
						<button>Edit</button>
					</Link>
					<div>
						<form onSubmit={handleCommentSubmit}>
							<textarea
								name=""
								id="comment-text"
								cols="30"
								rows="10"
								value={commentText}
								onChange={handleTextareaChange}
								placeholder="Your comment here..."
							></textarea>
							<br />
							<button type="submit">Comment</button>
						</form>

						<h2>Comments</h2>
						{comments &&
							[...comments].reverse().map((comment) => {
								return (
									<div style={commentStyle} key={comment.id}>
										<div>{comment.text}</div>
										<sup>{comment.date}</sup>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
}

export default DetailPost;
