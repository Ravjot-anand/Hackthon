import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
				<h1 className="text-3xl font-semibold text-green-600 mb-4">Registration Successful!</h1>
				<p className="text-gray-700 text-lg mb-6">
					Thank you for registering. You are now in the queue for the next interview round. We will contact you soon!
				</p>
				<p className="text-gray-500 mb-6">Please keep an eye on your email for further updates.</p>
				<Link to="/" className="text-blue-500 hover:underline">
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default SuccessPage;
