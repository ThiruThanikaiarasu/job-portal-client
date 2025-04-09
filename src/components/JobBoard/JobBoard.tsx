import React, { useEffect, useState } from 'react'
import JobCard from '../JobCard/JobCard'
import jobService from '../../services/jobService'
import useAppDataContext from '../../hooks/useAppDataContext'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { toast } from 'sonner'

const JobBoard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { jobsData, setJobsData } = useAppDataContext()

    useEffect(() => {
        setIsLoading(true)
        jobService
            .getAllJobs()
            .then((response) => {
                setJobsData(response.data.data)
            })
            .catch((error) => {
                const status = error.response?.status
                    const message = error.response?.data?.message ?? 'An error occurred'
                
                    if (status === 500) {
                        toast.error('Server error, please try again later')
                    } else if (status) {
                        toast.error(`Error ${status}: ${message}`)
                    } else if (error.request) {
                        toast.error('Network error. Please check your connection and try again.')
                    } else {
                        toast.error('Unexpected error occurred. Please try again later.')
                    }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {jobsData.length > 0 &&  jobsData.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default JobBoard
