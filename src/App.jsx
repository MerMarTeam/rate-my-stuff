import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import DetailPost from './pages/DetailPost';
import EditPost from './pages/EditPost';
import Navbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
	return (
		<>
			<div className='text-light'>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/create" element={<CreatePost />} />
					<Route path="/posts/:postId" element={<DetailPost />} />
					<Route path="/edit/:postId" element={<EditPost />} />

					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
