import { createContext, useState, ReactNode, useEffect } from "react"

type UserDataType = {
    email: string
    role: 'user' | 'admin'
}

type AppDataContextType = {
    userData: UserDataType[]
    setUserData: React.Dispatch<React.SetStateAction<UserDataType[]>>
    isUserLoggedIn: boolean
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

type AppDataContextProviderProps = {
    children: ReactNode
}

const AppDataContextProvider = ({ children }: AppDataContextProviderProps) => {
    const [userData, setUserData] = useState<UserDataType[]>([])
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

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
                setIsUserLoggedIn 
            }}
        >
            {children}
        </AppDataContext.Provider>
    )
}

export { AppDataContext, AppDataContextProvider }
