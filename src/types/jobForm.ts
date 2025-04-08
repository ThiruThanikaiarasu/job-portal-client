export type JobFormData = {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryMin: string;
    salaryMax: string;
    applicationDeadline: string;
    jobDescription: string;
  };
  
  export const jobTypes = ["Full Time", "Part Time", "Internship", "Contract"];
  
  export const locations = [
    "Remote",
    "New York, NY",
    "San Francisco, CA",
    "London, UK",
    "Bangalore, India",
    "Sydney, Australia"
  ];