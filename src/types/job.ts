export interface Job {
    _id: string;
    title: string
    companyName: string
    location: string
    jobType: string
    salaryMin: string
    salaryMax: string
    applicationDeadline: Date
    description: string
    createdAt?: Date
    updatedAt?: Date
  }