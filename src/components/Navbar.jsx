import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		const storedUserEmail = localStorage.getItem('userEmail');
		if (storedUserEmail) setUserEmail(storedUserEmail);
	}, [])

	function handleLogout(event) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userId');
		window.location.reload();
	}

	return (
		<nav>
			<button><Link to="/">Home</Link></button>
			<button><Link to="/register">Register</Link></button>
			<button><Link to="/login">Login</Link></button>
			<button onClick={handleLogout}>Logout</button>
			<p>User email: {userEmail}</p>

		</nav>
	);
}

export default Navbar;
