import { Job } from '../types/job'
import axiosInstance from '../utils/axiosInstance'

interface JobResponse {
    message: string
    error: string | null
    data: any // You can replace this with your IJob interface if defined
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

    getAllJobs: async () => {
        const response = await axiosInstance.get('/jobs')
        return response
    }
}

export default jobService
