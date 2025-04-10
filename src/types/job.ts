export interface Job {
    _id: string;
    title: string
    companyName: string
    location: string
    jobType: string
    salaryMin: string
    salaryMax: string
    applicationDeadline: Date | string
    description: string
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

export interface FilterValues {
    searchQuery: string;
    location: string;
    jobType: string;
    salaryMin: number;
    salaryMax: number;
    isFilterOpen: boolean;
}  