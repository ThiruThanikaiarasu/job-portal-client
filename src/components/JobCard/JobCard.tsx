import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Job } from '../../types/job'
import Experience from '../../svg/Experience/Experience'
import Company from '../../svg/Company/Company'
import Dollar from '../../svg/Dollar/Dollar'
import ThreeDot from '../../svg/ThreeDot/ThreeDot'

import logo from '../../../public/amazon-logo.png'

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const timeAgo = job.createdAt
        ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
        : 'Unknown'

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                        src={logo} 
                        alt={`${job.companyName} logo`} 
                        className="w-8 h-8 object-contain"
                    />
                </div>
                <div className="flex items-center space-x-2 relative">
                    <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                        {timeAgo}
                    </span>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <ThreeDot height='16' width='16' />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-8 bg-white border rounded-md shadow-lg z-10 w-32 text-sm">
                        <button
                            className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                            onClick={() => {
                            setIsMenuOpen(false)
                            alert('Edit clicked')
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                            onClick={() => {
                            setIsMenuOpen(false)
                            alert('Delete clicked')
                            }}
                        >
                            Delete
                        </button>
                        </div>
                    )}
                    </div>
                </div>
            
            <h3 className="text-lg font-bold mb-3">{job.title}</h3>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <Experience height='16' width='16' className='mr-[4px]'/>
                    <span>1-3</span>
                </div>
                <div className="flex items-center">
                    <Company height='16' width='16' className='mr-[4px]'/>
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                    <Dollar height='16' width='16' className='mr-[4px]'/>
                    <span>{job.salaryMax}</span>
                </div>
            </div>
            
            <ul className="list-disc pl-5 mb-6 text-sm text-gray-700 flex-grow">
                {job.description}
            </ul>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 mt-auto">
                Apply Now
            </button>
        </div>
    )
}

export default JobCard