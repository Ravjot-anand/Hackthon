import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('candidates'); // Default tab is 'Candidates'
    const [candidates, setCandidates] = useState([]);
    const [experts, setExperts] = useState([]);
    const [expertasssign, setExpertAssign] = useState([]);

    useEffect(() => {
        if (activeTab === 'candidates') {
            // Fetch candidates
            axios.get('http://localhost:8081/candidates')
                .then(response => {
                    setCandidates(response.data);
                })
                .catch(error => {
                    console.error("Error fetching candidates:", error);
                });
        } else if (activeTab === 'experts') {
            // Fetch experts
            axios.get('http://localhost:8081/experts')
                .then(response => {
                    setExperts(response.data);
                    console.log(response.data)

                })
                .catch(error => {
                    console.error("Error fetching experts:", error);
                });
        }
        else if (activeTab === 'expertsandcandidates') {
            // Fetch experts assigned to candidates
            axios.get('http://localhost:8081/expertscandidates')
                .then(response => {
                    setExpertAssign(response.data);
                })
                .catch(error => {
                    console.error("Error fetching expertscandidates:", error);
                });
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-600 text-white p-5">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                <ul>
                    <li>
                        <button 
                            className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'candidates' ? 'bg-blue-700' : ''}`} 
                            onClick={() => setActiveTab('candidates')}
                        >
                            Candidates
                        </button>
                    </li>
                    <li className="mt-4">
                        <button 
                            className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'experts' ? 'bg-blue-700' : ''}`} 
                            onClick={() => setActiveTab('experts')}
                        >
                            Experts
                        </button>
                    </li>
                    <li className="mt-4">
                        <button 
                            className={`w-full text-left py-2 px-4 rounded-lg ${activeTab === 'expertsandcandidates' ? 'bg-blue-700' : ''}`} 
                            onClick={() => setActiveTab('expertsandcandidates')}
                        >
                            Experts assinged to candidates
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6">
                {activeTab === 'candidates' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Candidates List</h2>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Expertise</th>
                                    <th className="py-2 px-4 border-b">Education</th>
                                    <th className="py-2 px-4 border-b">Experience (years)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map(candidate => (
                                    <tr key={candidate.id}>
                                        <td className="py-2 px-4 border-b">{candidate.candidate_id}</td>
                                        <td className="py-2 px-4 border-b">{candidate.name}</td>
                                        <td className="py-2 px-4 border-b">{candidate.area_of_expertise}</td>
                                        <td className="py-2 px-4 border-b">{candidate.education}</td>
                                        <td className="py-2 px-4 border-b">{candidate.experience}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'experts' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Experts List</h2>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Domain</th>
                                    <th className="py-2 px-4 border-b">Expertise</th>
                                    <th className="py-2 px-4 border-b">Publications</th>
                                    <th className="py-2 px-4 border-b">Projects</th>
                                    <th className="py-2 px-4 border-b">Experience</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {experts.map(expert => (
                                    <tr key={expert.id}>
                                        <td className="py-2 px-4 border-b">{expert.expert_id}</td>
                                        <td className="py-2 px-4 border-b">{expert.name}</td>
                                        <td className="py-2 px-4 border-b">{expert.domain}</td>
                                        <td className="py-2 px-4 border-b">{expert.expertise}</td>
                                        <td className="py-2 px-4 border-b">{expert.publications}</td>
                                        <td className="py-2 px-4 border-b">{expert.projects}</td>
                                        <td className="py-2 px-4 border-b">{expert.experience}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
               {activeTab === 'expertsandcandidates' && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Experts List</h2>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Board ID</th>
                                    <th className="py-2 px-4 border-b">Candidate ID</th>
                                    <th className="py-2 px-4 border-b">Expert ID</th>
                                    <th className="py-2 px-4 border-b">Interview Date</th>
                                    <th className="py-2 px-4 border-b">Interview Subject</th>
                                    <th className="py-2 px-4 border-b">Suitablity Score</th>
                                    
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {expertasssign.map(expertassigned => (
                                    <tr key={expertassigned.id}>
                                        <td className="py-2 px-4 border-b">{expertassigned.interview_board_id}</td>
                                        <td className="py-2 px-4 border-b">{expertassigned.candidate_id}</td>
                                        <td className="py-2 px-4 border-b">{expertassigned.expert_id}</td>
                                        <td className="py-2 px-4 border-b">{expertassigned.interview_date }</td>
                                        <td className="py-2 px-4 border-b">{expertassigned.interview_subject}</td>
                                        <td className="py-2 px-4 border-b">{expertassigned.suitability_score}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
