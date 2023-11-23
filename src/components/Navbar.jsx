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
		<nav>
			<Link to="/">
				<i className="fa-solid fa-star fa-spin fa-2xl" style={{ color: "white", marginRight: '20px', paddingRight: '10px' }}></i>
				<img className="logo" src={logo} alt="" />
			</Link>
			<hr />
		</nav>
	);
}

export default Navbar;
