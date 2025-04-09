import { JobFormData } from '../types/jobForm'
import axiosInstance from '../utils/axiosInstance'

interface JobResponse {
    message: string
    error: string | null
    data: any // You can replace this with your IJob interface if defined
}

const jobService = {
    createJob: async (jobData: JobFormData) => {
        const response = await axiosInstance.post<JobResponse>('/jobs', jobData)
        return response
    },

    updateJob: async (jobId: string, updatedData: Partial<JobFormData>) => {
        const response = await axiosInstance.put<JobResponse>(`/jobs/${jobId}`, updatedData)
        return response
    },

    deleteJob: async (jobId: string) => {
        const response = await axiosInstance.delete<JobResponse>(`/jobs/${jobId}`)
        return response
    },
}

export default jobService
