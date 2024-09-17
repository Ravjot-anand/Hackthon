import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import BGIMAGE from './BAckground.jpeg'

const AdminLoginPage = () => {
	const [username, setUsername] = useState('');
	const [pin, setPin] = useState('');
	const [errors, setErrors] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Input validation function
	const validateForm = () => {
		const newErrors = {};

		// Validate username: not empty
		if (!username.trim()) {
			newErrors.username = 'Username is required';
		}

		// Validate pin: must be 6 digits
		if (!pin.trim()) {
			newErrors.pin = 'Pin is required';
		} 

		return newErrors;
	};

	// Submit handler
	const handleSubmit = (e) => {
		e.preventDefault();

		// Perform validation
		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length === 0) {
			// If no validation errors, submit form data
			axios.post('http://localhost:8081/admin-login', {
				username,
				pin
			})
				.then(res => {
					if (res.data === "Success") {
						setIsLoggedIn(true);  // Mark admin as logged in
					} else {
						alert("no record")
					}
				})
				.catch(err => {
					console.error(err);
					setErrors({ login: 'An error occurred during login' });
				});
		} else {
			// Set validation errors if form is invalid
			setErrors(validationErrors);
		}
	};

	if (isLoggedIn) {
		return <Navigate to="/admin-dashboard" />;  // Redirect on successful login
	}

	return (
		<div className=' max-w-full bg-contain '
			style={{ backgroundImage: `url(${BGIMAGE})` }}

		>

			<div className="min-h-screen flex flex-row items-center justify-end mr-10" >
				<div className=" bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-semibold text-black mb-6 text-center">Admin Login</h2>

					<form onSubmit={handleSubmit}>
						{/* Username Field */}
						<div className="mb-4">
							<label htmlFor="username" className="block text-black text-sm font-bold mb-2">
								Username
							</label>
							<input
								type="text"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
								placeholder="Enter your username"
							/>
							{errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
						</div>

						{/* Pin Field */}
						<div className="mb-6">
							<label htmlFor="pin" className="block text-black text-sm font-bold mb-2">
								Pin (6 digits)
							</label>
							<input
								type="password"
								id="pin"
								value={pin}
								onChange={(e) => setPin(e.target.value)}
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-500' : ''}`}
								placeholder="Enter your 6-digit pin"
							/>
							{errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
						</div>

						{/* Submit Button */}
						<div className="flex items-center justify-between">
							<button
								type='submit'
								class="group relative flex flex-row items-center bg-[#212121] justify-center gap-2 rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
							>
								<div
									class="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-[1px] ![mask-composite:subtract]"
								></div>
								<svg
									class="size-4 text-[#ffaa40]"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 15 15"
									height="15"
									width="15"
								>
									<path
										clip-rule="evenodd"
										fill-rule="evenodd"
										fill="currentColor"
										d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"
									></path>
								</svg>
								<div
									class="shrink-0 bg-border w-[1px] h-4"
									role="none"
									data-orientation="vertical"
								></div>
								<span
									class="inline animate-gradient whitespace-pre bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%] text-center"
								>Get Access</span
								>
								<svg
									stroke-linecap="round"
									class="text-[#9c40ff]"
									stroke-width="1.5"
									aria-hidden="true"
									viewBox="0 0 10 10"
									height="11"
									width="11"
									stroke="currentColor"
									fill="none"
								>
									<path
										stroke-linecap="round"
										d="M0 5h7"
										class="opacity-0 transition group-hover:opacity-100"
									></path>
									<path
										stroke-linecap="round"
										d="M1 1l4 4-4 4"
										class="transition group-hover:translate-x-[3px]"
									></path>
								</svg>
							</button>

						</div>

						{/* Error Message for Invalid Login */}
						{errors.login && <p className="text-red-500 text-sm mt-4 text-center">{errors.login}</p>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLoginPage;
