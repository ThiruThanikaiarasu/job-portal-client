import { useState, useRef, useEffect, useMemo } from "react"
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5"
import useAppDataContext from "../../hooks/useAppDataContext"
import jobService from "../../services/jobService"
import { toast } from "sonner"
import { FilterValues } from "../../types/job"
import useDebounce from "../../hooks/useDebounce"
import SalaryRangeSelector from "./SalaryRangeSelector"

export const FilterComponent = () => {

    const { searchQuery, setSearchQuery, location, setLocation, jobType, setJobType, salaryRange, setSalaryRange, setJobsData } = useAppDataContext()
    
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [isMobileView, setIsMobileView] = useState<boolean>(false)
    
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkIfMobile = () => {
        setIsMobileView(window.innerWidth < 1024)
        }
        
        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)
        
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setIsFilterOpen(false)
        }
        }
        
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
    }

    const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setJobType(e.target.value)
    }

    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        const isMinSlider = e.target.id === "minSalary"
        
        if (isMinSlider) {
        setSalaryRange([value, Math.max(value, salaryRange[1])])
        } else {
        setSalaryRange([Math.min(value, salaryRange[0]), value])
        }
    }

    const resetFilters = () => {
        setSearchQuery("")
        setLocation("")
        setJobType("")
        setSalaryRange([10000, 70000])
    }

    const applyFilters = () => {      
        setIsFilterOpen(false)
    }

    const filterValues = useMemo<FilterValues>(() => ({
        searchQuery,
        location,
        jobType,
        salaryMin: salaryRange[0],
        salaryMax: salaryRange[1],
        isFilterOpen
      }), [searchQuery, location, jobType, salaryRange,isFilterOpen])

    const debouncedFilterValues = useDebounce<FilterValues>(filterValues, 500)

    useEffect(() => {
        jobService.getAllJobs(
          debouncedFilterValues.searchQuery,
          debouncedFilterValues.location,
          debouncedFilterValues.jobType,
          debouncedFilterValues.salaryMin,
          debouncedFilterValues.salaryMax
        )
          .then((response) => {
            if(response.status === 200) {
              setJobsData(response.data.data)
            }
          })
          .catch((error: any) => {
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
    }, [debouncedFilterValues])

    return (
        <div className="w-full bg-white shadow-md rounded-lg">
            <div className="container mx-auto px-4 py-3">
                <div className={`${isMobileView ? "hidden" : "flex"} items-center gap-4`}>
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search By Job Title, Role"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                
                    <div className="relative w-64">
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Preferred Location"
                            value={location}
                            onChange={handleLocationChange}
                            className="flex-1 focus:outline-none"
                        />
                        </div>
                    </div>
                
                    <div className="w-64">
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <FaBriefcase className="text-gray-400 mr-2" />
                        <select
                            value={jobType}
                            onChange={handleJobTypeChange}
                            className="flex-1 bg-transparent focus:outline-none"
                        >
                            <option value="">Job type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                        </div>
                    </div>
                
                    <div className="w-80">
      <div className="border border-gray-300 rounded-md px-4 py-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Salary Per Month</span>
          <span className="text-sm font-medium">
            ₹{(salaryRange[0] / 1000).toFixed(0)}k - ₹{(salaryRange[1] / 1000).toFixed(0)}k
          </span>
        </div>

        {/* Replaced input sliders with DualRangeSlider */}
        <div className="mt-2">
          <SalaryRangeSelector
            value={salaryRange}
            onValueChange={setSalaryRange}
            min={10000}
            max={200000}
            step={5000}
            // label={() => <>₹</>}
            // labelPosition="static"
            // lableContenPos="right"
          />
        </div>
      </div>
    </div>
                </div>
                
                <div className={`${isMobileView ? "flex" : "hidden"} items-center justify-between gap-2`}>
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={toggleFilter}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <FaFilter />
                            <span>Filter</span>
                        </button>
                        
                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 p-4 border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium">Filters</h3>
                                    <button 
                                        onClick={() => setIsFilterOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <IoCloseOutline size={20} />
                                    </button>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                                        <input
                                        type="text"
                                        placeholder="Preferred Location"
                                        value={location}
                                        onChange={handleLocationChange}
                                        className="flex-1 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                        <FaBriefcase className="text-gray-400 mr-2" />
                                        <select
                                        value={jobType}
                                        onChange={handleJobTypeChange}
                                        className="flex-1 bg-transparent focus:outline-none"
                                        >
                                        <option value="">All Types</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                                        <span className="text-sm font-medium">
                                        ₹{(salaryRange[0]/1000).toFixed(0)}k - ₹{(salaryRange[1]/1000).toFixed(0)}k
                                        </span>
                                    </div>
                                    <div className="relative h-2 mt-4 mb-6">
                                        <input
                                        id="minSalary"
                                        type="range"
                                        min="10000"
                                        max="200000"
                                        step="5000"
                                        value={salaryRange[0]}
                                        onChange={handleSalaryChange}
                                        className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                        id="maxSalary"
                                        type="range"
                                        min="10000"
                                        max="200000"
                                        step="5000"
                                        value={salaryRange[1]}
                                        onChange={handleSalaryChange}
                                        className="absolute w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={resetFilters}
                                        className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={applyFilters}
                                        className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent

