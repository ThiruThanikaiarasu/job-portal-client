import JobBoard from "../../components/JobBoard/JobBoard"
import { jobData } from "../../constants/jobData"

const HomePage = () => {
    return (
        <main>
            <JobBoard jobs={jobData} />
        </main>
    )
}

export default HomePage