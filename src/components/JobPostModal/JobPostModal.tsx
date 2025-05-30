import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { jobTypes, locations } from "../../types/jobForm"
import jobService from "../../services/jobService"
import { toast } from "sonner"
import { AxiosError } from "axios"
import useAppDataContext from "../../hooks/useAppDataContext"
import { Job } from "../../types/job"

const JobPostModal = () => {

    const { showModal, setShowModal, jobBeingEdited, setJobsData } = useAppDataContext()
    if(!showModal) return null 

    const [originalJobData, setOriginalJobData] = useState<Job | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<Job>({
        defaultValues: {
            title: '',
            companyName: '',
            location: '',
            jobType: '',
            salaryMin: '',
            salaryMax: '',
            applicationDeadline: '',
            description: ''
        }
    })
    
    useEffect(() => {
        if (jobBeingEdited) {
            const formattedJobData = {
              ...jobBeingEdited,
              applicationDeadline: new Date(jobBeingEdited.applicationDeadline).toISOString().split("T")[0]
            }
          
            reset(formattedJobData)
            setOriginalJobData(jobBeingEdited)
          }
           else {
            const storedData = localStorage.getItem('yourKey')

            if (storedData) {
                try {
                const parsed = JSON.parse(storedData)
                reset(parsed)
                } catch (e) {
                console.error('Failed to parse JSON:', e)
                }
            } else {
                console.log('No data in localStorage')
            }
        }
    }, [])

    const closeModal = () => {
        setShowModal(false)
        reset()
        setOriginalJobData(null)
    }

    const onSaveDraft = (data: Job) => {
        localStorage.setItem('jobDraft', JSON.stringify(data))
        alert('Draft saved successfully!')
        closeModal()
    }

    const normalizeDate = (date: string | Date): string => {
        return new Date(date).toISOString().split('T')[0]
    }
    
    const getChangedFields = (current: Job, original: Job | null): Partial<Job> => {
        if (!original) return current
    
        const changes: Partial<Job> = {}
    
        if (current.title !== original.title) changes.title = current.title
        if (current.companyName !== original.companyName) changes.companyName = current.companyName
        if (current.location !== original.location) changes.location = current.location
        if (current.jobType !== original.jobType) changes.jobType = current.jobType
        if (current.salaryMin !== original.salaryMin) changes.salaryMin = current.salaryMin
        if (current.salaryMax !== original.salaryMax) changes.salaryMax = current.salaryMax
        if (normalizeDate(current.applicationDeadline) !== normalizeDate(original.applicationDeadline)) {
            changes.applicationDeadline = current.applicationDeadline
        }
        if (current.description !== original.description) changes.description = current.description
    
        return changes
    }
    

    const onSubmit = (data: Job) => {
        if (jobBeingEdited) {
            const changes = getChangedFields(data, originalJobData)
    
            if (Object.keys(changes).length === 0) {
                toast.error('No changes detected. Please make changes before submitting.')
                return
            }
    
            jobService.updateJob(data._id, changes)
                .then((response) => {
                    if(response.status == 200) {
                        setJobsData((prevJobs) =>
                            prevJobs.map((job) =>
                                job._id === data._id
                                    ? { ...job, ...changes }
                                    : job
                            )
                        )
                        closeModal()
                        toast.success('Job edited Successfully')
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
                return 
        }
        
        localStorage.removeItem('jobDraft')
        jobService.createJob(data)
            .then((response) => {
                if(response.status == 201) {
                    const newJob = response.data.data 

                    setJobsData(prevJobs => [newJob, ...prevJobs])
                    closeModal()
                    toast.success('Job created Successfully')
                }
            })
            .catch((error: AxiosError<any>) => {            
                const status = error.response?.status
                const message = error.response?.data?.message ?? 'An error occurred'
            
                if (status === 409) {
                    toast.error('Opening already exist, create new one')
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
        <div>
            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203</span>

                        <div 
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                            role="dialog" 
                            aria-modal="true" 
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-xl leading-6 font-medium text-gray-900 mb-6 text-center" id="modal-headline">
                                            {jobBeingEdited ? 'Edit Job Posting' : 'Create Job Opening'}
                                        </h3>
                                        
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                        Job Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        placeholder="Eg: Software Developer"
                                                        {...register('title', { required: 'Job title is required' })}
                                                        className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.title && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                                        Company Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="companyName"
                                                        placeholder="Amazon, Microsoft, Swiggy"
                                                        {...register('companyName', { required: 'Company name is required' })}
                                                        className={`mt-1 block w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.companyName && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                        Location
                                                    </label>
                                                    <select
                                                        id="location"
                                                        {...register('location', { required: 'Location is required' })}
                                                        className={`mt-1 block w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    >
                                                        <option value="">Choose Preferred Location</option>
                                                        {locations.map((location) => (
                                                            <option key={location} value={location}>
                                                                {location}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.location && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                                                        Job Type
                                                    </label>
                                                    <select
                                                        id="jobType"
                                                        {...register('jobType', { required: 'Job type is required' })}
                                                        className={`mt-1 block w-full border ${errors.jobType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    >
                                                        <option value="">Select Job Type</option>
                                                        {jobTypes.map((type) => (
                                                            <option key={type} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.jobType && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700">
                                                        Salary Min (in LPA)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="salaryMin"
                                                        placeholder="Eg: 8"
                                                        {...register('salaryMin', {
                                                            required: 'Minimum salary is required',
                                                            pattern: {
                                                                value: /^(?:[1-9]|[1-9][0-9])(?:\.\d{1,2})?$/,
                                                                message: 'Enter a valid package. Eg: 8'
                                                            }
                                                        })}
                                                        className={`mt-1 block w-full border ${errors.salaryMin ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.salaryMin && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.salaryMin.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700">
                                                        Salary Max (in LPA)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="salaryMax"
                                                        placeholder="Eg: 12"
                                                        {...register('salaryMax', {
                                                            required: 'Maximum salary is required',
                                                            pattern: {
                                                                value: /^(?:[1-9]|[1-9][0-9])(?:\.\d{1,2})?$/,
                                                                message: 'Enter a valid package. Eg: 12'
                                                            },
                                                            validate: (value) => {
                                                                const min = parseFloat(getValues('salaryMin'))
                                                                const max = parseFloat(value)
                                                                return max >= min || "Maximum salary must be greater than or equal to minimum salary"
                                                            }
                                                        })}
                                                        className={`mt-1 block w-full border ${errors.salaryMax ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.salaryMax && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.salaryMax.message}</p>
                                                    )}
                                                </div>

                                                <div className="col-span-1 md:col-span-2">
                                                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                                                        Application Deadline
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="applicationDeadline"
                                                        {...register('applicationDeadline', { 
                                                            required: 'Application deadline is required',
                                                            validate: value => {
                                                                const date = new Date(value)
                                                                const today = new Date()
                                                                today.setHours(0, 0, 0, 0)
                                                                return date >= today || 'Deadline must be in the future'
                                                            }
                                                        })}
                                                        className={`mt-1 block w-full border ${errors.applicationDeadline ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.applicationDeadline && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.applicationDeadline.message}</p>
                                                    )}
                                                </div>

                                                <div className="col-span-1 md:col-span-2">
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                        Job Description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        rows={5}
                                                        placeholder="Please share a description to let the candidate know more about the job role"
                                                        {...register('description', { 
                                                            required: 'Job description is required',
                                                            minLength: { value: 50, message: 'Description should be at least 50 characters' }
                                                        })}
                                                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                                    />
                                                    {errors.description && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit(onSaveDraft)}
                                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-1 sm:text-sm"
                                                >
                                                    Save Draft
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobPostModal