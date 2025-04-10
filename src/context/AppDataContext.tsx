import { createContext, useState, ReactNode, useEffect } from "react"
import { Job } from "../types/job"

type UserDataType = {
    email: string
    role: 'user' | 'admin'
}

type AppDataContextType = {
    userData: UserDataType[]
    setUserData: React.Dispatch<React.SetStateAction<UserDataType[]>>
    isUserLoggedIn: boolean
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    jobsData: Job[]
    setJobsData: React.Dispatch<React.SetStateAction<Job[]>>
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    jobBeingEdited: Job | null
    setJobBeingEdited: React.Dispatch<React.SetStateAction<Job | null>>
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    location: string
    setLocation: React.Dispatch<React.SetStateAction<string>>
    jobType: string
    setJobType: React.Dispatch<React.SetStateAction<string>>
    salaryRange: [number, number]
    setSalaryRange: React.Dispatch<React.SetStateAction<[number, number]>>
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

type AppDataContextProviderProps = {
    children: ReactNode
}

const AppDataContextProvider = ({ children }: AppDataContextProviderProps) => {
    const [userData, setUserData] = useState<UserDataType[]>([])
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [jobsData, setJobsData] = useState<Job[]>([])
    const [showModal, setShowModal] = useState(false)
    const [jobBeingEdited, setJobBeingEdited] = useState<Job | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [jobType, setJobType] = useState<string>("")
    const [salaryRange, setSalaryRange] = useState<[number, number]>([10000, 70000])

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData')
        const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn')
    
        if (storedUserData) {
          try {
            const parsedData = JSON.parse(storedUserData) as UserDataType[]
            setUserData(parsedData)
          } catch (err) {
            console.error("Failed to parse userData from localStorage", err)
          }
        }
    
        if (storedIsLoggedIn === 'true') {
            console.log("yess")
            setIsUserLoggedIn(true)
        }
      }, [])

    return (
        <AppDataContext.Provider 
            value={{ 
                userData, 
                setUserData,
                isUserLoggedIn,
                setIsUserLoggedIn,
                jobsData,
                setJobsData,
                showModal,
                setShowModal,
                jobBeingEdited,
                setJobBeingEdited,
                searchQuery,
                setSearchQuery,
                location,
                setLocation,
                jobType,
                setJobType,
                salaryRange,
                setSalaryRange 
            }}
        >
            {children}
        </AppDataContext.Provider>
    )
}

export { AppDataContext, AppDataContextProvider }
