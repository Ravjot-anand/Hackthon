import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Candidate() {
    const [candidate, setCandidate] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/candidates')
            .then(res => setCandidate(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container mx-auto mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Candidates Registered</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Area of Expertise</th>
                            <th className="py-3 px-6 text-left">Education</th>
                            <th className="py-3 px-6 text-left">Experience</th>
                            <th className="py-3 px-6 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidate.map((data, i) => (
                                <tr className='border-b hover:bg-gray-100'>
                                    <td className='py-4 px-6'>{data.candidate_id}</td>
                                    <td className='py-4 px-6'>{data.name}</td>
                                    <td className='py-4 px-6'>{data.area_of_expertise}</td>
                                    <td className='py-4 px-6'>{data.education}</td>
                                    <td className='py-4 px-6'>{data.experience}</td>
                                    <td className='py-4 px-6'>
                                        <button
                                            className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                        >
                                            <svg
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                class="h-5 w-5 mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    stroke-width="2"
                                                    stroke-linejoin="round"
                                                    stroke-linecap="round"
                                                ></path>
                                            </svg>

                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Candidate