import React from 'react'
import { Job } from '../../types/job'
import Experience from '../../svg/Experience/Experience'
import Company from '../../svg/Company/Company'
import Dollar from '../../svg/Dollar/Dollar'

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                        src={job.logo} 
                        alt={`${job.company} logo`} 
                        className="w-8 h-8 object-contain"
                    />
                </div>
                <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                    {job.timePosted}
                </span>
            </div>
            
            <h3 className="text-lg font-bold mb-3">{job.title}</h3>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <Experience height='16' width='16' className='mr-[4px]'/>
                    <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                    <Company height='16' width='16' className='mr-[4px]'/>
                    <span>{job.locationType}</span>
                </div>
                <div className="flex items-center">
                    <Dollar height='16' width='16' className='mr-[4px]'/>
                    <span>{job.salary}</span>
                </div>
            </div>
            
            <ul className="list-disc pl-5 mb-6 text-sm text-gray-700 flex-grow">
                {job.description.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                ))}
            </ul>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 mt-auto">
                Apply Now
            </button>
        </div>
    )
}

export default JobCard