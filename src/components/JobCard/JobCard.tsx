import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Job } from '../../types/job'
import Experience from '../../svg/Experience/Experience'
import Company from '../../svg/Company/Company'
import Dollar from '../../svg/Dollar/Dollar'
import ThreeDot from '../../svg/ThreeDot/ThreeDot'

import logo from '../../../public/amazon-logo.png'
import useAppDataContext from '../../hooks/useAppDataContext'
import jobService from '../../services/jobService'
import { toast } from 'sonner'

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const { setJobBeingEdited, setShowModal, setJobsData } = useAppDataContext()
    const timeAgo = job.createdAt
        ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
        : 'Unknown'

    const handleEdit = () => {
        setIsMenuOpen(false)
        setJobBeingEdited(job)
        setShowModal(true)
    }

    const handleDelete = () => {
        setIsMenuOpen(false)
        setShowDeleteConfirmModal(true)
    }

    const handleConfirmDelete = () => {
        jobService.deleteJob(job._id)
            .then((response) => {
                if(response.status == 200) {
                    setJobsData(prevJobs => prevJobs.filter(j => j._id !== job._id))
                    toast.success('Job deleted Successfully')
                    setShowDeleteConfirmModal(false)
                }
            })
            .catch((error) => {
                const status = error.response?.status
                const message = error.response?.data?.message ?? 'An error occurred'
            
                if (status === 401) {
                    toast.error(message)
                } else if (status === 403) {
                    toast.error(message)
                } else if (status === 404) {
                    toast.error(message)
                } else if (status === 500) {
                    toast.error('Server error, please try again later')
                } else if (status) {
                    toast.error(`Error ${status}: ${message}`)
                } else if (error.request) {
                    toast.error('Network error. Please check your connection and try again.')
                } else {
                    toast.error('Unexpected error occurred. Please try again later.')
                }
            })
    }

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
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                            onClick={handleDelete}
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

            {showDeleteConfirmModal && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md p-6 w-80 shadow-xl text-center">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p className="text-sm text-gray-700 mb-6">Are you sure you want to delete this job?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowDeleteConfirmModal(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobCard