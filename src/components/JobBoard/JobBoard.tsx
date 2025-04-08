import React from 'react';
import { Job } from '../../types/job';
import JobCard from '../JobCard/JobCard';

interface JobBoardProps {
  jobs: Job[];
}

const JobBoard: React.FC<JobBoardProps> = ({ jobs }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="">
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobBoard;