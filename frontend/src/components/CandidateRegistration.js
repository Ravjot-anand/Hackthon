import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Logo from '../DRDOLOGO.png'

const RegistrationPage = () => {
	const [name, setName] = useState('');
	const [expertise, setExpertise] = useState('');
	const [education, setEducation] = useState('');
	const [experience, setExperience] = useState('');
	const [errors, setErrors] = useState({});  // State to track validation errors
	const [submitted, setSubmitted] = useState(false);  // Track successful form submission

	// Validation function
	const validateForm = () => {
		const newErrors = {};

		// Name validation: not empty
		if (!name.trim()) {
			newErrors.name = 'Name is required';
		}

		// Expertise validation: not empty
		if (!expertise.trim()) {
			newErrors.expertise = 'Area of expertise is required';
		}

		// Education validation: not empty
		if (!education.trim()) {
			newErrors.education = 'Education is required';
		}

		// Experience validation: must be a number and >= 0
		if (!experience.trim()) {
			newErrors.experience = 'Experience is required of atleast 5 yrs';
		}

		return newErrors;
	};

	// Submit handler
	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length === 0) {
			// Form is valid, submit the data
			axios.post('http://localhost:8081/', {
				name,
				expertise,
				education,
				experience
			})
				.then(response => {
					console.log(response.data);
					setSubmitted(true);  // Mark form as successfully submitted
				})
				.catch(error => {
					console.error(error);
				});
		} else {
			// Set validation errors
			setErrors(validationErrors);
		}
	};

	if (submitted) {
		return <Navigate to="/success" />;  // Redirect after successful submission
	}

	return (
		<div className="min-h-screen bg-gray-400">
			{/* Top Bar */}
			<nav className="bg-blue-600 p-4 flex justify-between items-center">
				<div className="flex items-center">
					<img
						src={Logo}  // Add your logo here, make sure to have the correct path to the logo file
						alt="DRDO Logo"
						className="h-12 w-12 mr-4"
					/>
					<h1 className="text-white text-2xl font-semibold">Defence Research and Development Organisation</h1>
				</div>
				<div>
					<Link
						to="/admin-login"
						class="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
						type="submit"
					>
						Admin
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 19"
							class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
						>
							<path
								class="fill-gray-800 group-hover:fill-gray-800"
								d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
							></path>
						</svg>
					</Link>
				</div>
			</nav>

			{/* Registration Form */}
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Candidate Registration</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
								placeholder="Enter your name"
							/>
							{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
						</div>

						<div className="mb-4">
							<label htmlFor="expertise" className="block text-gray-700 text-sm font-bold mb-2">
								Area of Expertise (keywords or tags)
							</label>
							<input
								type="text"
								id="expertise"
								value={expertise}
								onChange={(e) => setExpertise(e.target.value)}
								required
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expertise ? 'border-red-500' : ''}`}
								placeholder="e.g. Web Development, Data Science"
							/>
							{errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
						</div>

						<div className="mb-4">
							<label htmlFor="education" className="block text-gray-700 text-sm font-bold mb-2">
								Education
							</label>
							<input
								type="text"
								id="education"
								value={education}
								onChange={(e) => setEducation(e.target.value)}
								required
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.education ? 'border-red-500' : ''}`}
								placeholder="Enter your highest qualification"
							/>
							{errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
						</div>

						<div className="mb-6">
							<label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">
								Experience (years)
							</label>
							<input
								type="text"
								id="experience"
								value={experience}
								onChange={(e) => setExperience(e.target.value)}
								required
								className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.experience ? 'border-red-500' : ''}`}
								placeholder="Enter your years of experience"
							/>
							{errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
						</div>

						<div className="flex items-center justify-between">
							<button
								type="submit"
								class="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
							>
								Register
								<svg
									class="w-5 h-5"
									stroke="currentColor"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
										stroke-linejoin="round"
										stroke-linecap="round"
									></path>
								</svg>
							</button>

						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegistrationPage;
