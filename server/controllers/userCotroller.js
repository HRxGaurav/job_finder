import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import JobPost from '../models/JobPost.js';

dotenv.config();

const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(422).json({ error: "Please fill in all fields properly" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(422).json({ error: "User already registered" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, phone, password: hashPassword });            
            await newUser.save();
            const userLogin = await User.findOne({ email })
            const token = jwt.sign({ userID: userLogin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
            res.status(201).json({ message: "User registered successfully", name:name, token:token });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill the data' })
        }

        const userLogin = await User.findOne({ email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                // Generate JWT Token
                const token = jwt.sign({ userID: userLogin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' }) 
                res.status(200).json({ meassge: "User Logged in sucesfully", token: token, name:userLogin.name })
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" })
        }

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

const jobPost = async (req, res) => {
    const { company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required, information } = req.body;

    try {
        
        if (!company_name, !logo_url, !job_position, !monthly_salary, !job_type, !remote_office, !location, !job_description, !about_company, !skills_required, !information) {
            return res.status(422).json({ status: "failed", message: "Please fill in all fields properly" })
        } else {
            const addJob = new JobPost({ company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required, information });

            await addJob.save();
            res.status(201).json({ status: "sucess", message: "job post sucessfully added" });
        }
    } catch (error) {
        res.status(500).json({ status: "failed", message: "server error" })
    }

}

const editJob = async (req, res) => {
    const jobId = req.params.id;

    const { company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required, information } = req.body;

    try {
        const job = await JobPost.findById(jobId);
        

        if (!job) {
            return res.status(404).json({ status: 'failed', message: 'Job not found' });
        }

        if (company_name) job.company_name = company_name;
        if (logo_url) job.logo_url = logo_url;
        if (job_position) job.job_position = job_position;
        if (monthly_salary) job.monthly_salary = monthly_salary;
        if (job_type) job.job_type = job_type;
        if (remote_office) job.remote_office = remote_office;
        if (location) job.location = location;
        if (job_description) job.job_description = job_description;
        if (about_company) job.about_company = about_company;
        if (skills_required) job.skills_required = skills_required;
        if (information) job.information = information;

        await job.save();
        res.status(200).json({ status: 'success', message: 'Job post successfully updated' });

    } catch (error) {
        res.status(500).json({ status: "failed", message: "server error" })
    }
}



const getJobs = async (req, res) => {
    const { skills_required, job_position } = req.body;

    try {
        let filter = {};

        if (skills_required) {
            filter.skills_required = { $regex: skills_required, $options: 'i' };
        }

        if (job_position) {
            filter.job_position = { $regex: job_position, $options: 'i' };
        }

        const jobs = await JobPost.find(filter, {
            job_position: 1,
            logo_url: 1,
            monthly_salary: 1,
            job_type: 1,
            remote_office: 1,
            location: 1,
            skills_required: 1,
        });

        res.status(200).json({ status: 'success', data: jobs });
    } catch (error) {
        res.status(500).json({ status: 'failed', message: 'server error' });
    }
};


const jobDescription = async(req, res)=>{
    const jobId = req.params.id;

    try {
        const jd= await JobPost.findById(jobId);
        res.status(200).json({status:"sucess", data:jd})
    } catch (error) {
        res.status(500).json({ status: "failed", message: "server error" })
    }


}

const deleteAllJobs = async (req, res) => {
    try {
      const result = await JobPost.deleteMany({});
  
      res.status(200).json({ status: 'success', message: `${result.deletedCount} jobs deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed', message: 'Server error' });
    }
};

const loggedIn= async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ message: 'failed' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ message: 'sucess', user: decoded.username });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };




export default { login, register, jobPost, editJob, getJobs,jobDescription, loggedIn, deleteAllJobs };