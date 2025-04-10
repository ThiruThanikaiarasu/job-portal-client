import { Job } from '../types/job'
import axiosInstance from '../utils/axiosInstance'

interface JobResponse {
    message: string
    error: string | null
    data: any 
}

const jobService = {
    createJob: async (jobData: Job) => {
        const response = await axiosInstance.post<JobResponse>('/jobs', jobData)
        return response
    },

    updateJob: async (jobId: string, updatedData: Partial<Job>) => {
        const response = await axiosInstance.put(`/jobs/${jobId}`, updatedData)
        return response
    },

    deleteJob: async (jobId: string) => {
        const response = await axiosInstance.delete<JobResponse>(`/jobs/${jobId}`)
        return response
    },

    getAllJobs: async (searchQuery = '', location = '', jobType = '', minSalary = 10000, maxSalary = 70000) => {
        const queryParams = new URLSearchParams({
            searchQuery,
            location,
            jobType,
            minSalary: minSalary.toString(),
            maxSalary: maxSalary.toString(),
        }).toString()
    
        const response = await axiosInstance.get(`/jobs?${queryParams}`)
        return response
    }
}

export default jobService
