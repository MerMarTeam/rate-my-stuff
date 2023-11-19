import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navbar">
			<Link to="/">
				<img className="logo" src="src\images\logo.png" alt="" />
			</Link>
		</nav>
	);
}

export default Navbar;
