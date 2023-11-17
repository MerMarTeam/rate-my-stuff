import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import DetailPost from './pages/DetailPost';
import EditPost from './pages/EditPost';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePost />} />
				<Route path="/post/:postId" element={<DetailPost />} />
				<Route path="/edit/:postId" element={<EditPost />} />
			</Routes>
		</>
	);
}

export default App;
