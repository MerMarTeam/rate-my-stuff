import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navbar(props) {
	const [userEmail, setUserEmail] = useState();

	function getDataFromLocalStorage() {
		const storedUserEmail = localStorage.getItem('userEmail');
		if (storedUserEmail) setUserEmail(storedUserEmail);
	}

	useEffect(() => {
		getDataFromLocalStorage();
	}, []);

	function handleLogout(event) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userId');
		console.log('User was logged out.');
		window.location.reload();
	}

	return (
		<nav className="navbar">
			<Link to="/">
				<i class="fa-solid fa-star fa-spin fa-2xl"></i>

				<img className="logo" src={logo} alt="" />
			</Link>
		</nav>
	);
}

export default Navbar;
