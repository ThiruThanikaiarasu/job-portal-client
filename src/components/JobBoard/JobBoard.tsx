import React, { useEffect, useState } from 'react'
import JobCard from '../JobCard/JobCard'
import jobService from '../../services/jobService'
import useAppDataContext from '../../hooks/useAppDataContext'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

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
                console.log(error)
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
