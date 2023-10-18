import mongoose from "mongoose";


const jobPostSchema = new mongoose.Schema({
    company_name:{type:String},
    logo_url:{type:String},
    job_position:{type:String},
    monthly_salary:{type:String},
    job_type:{type:String},
    remote_office:{type:String},
    location:{type:String},
    job_description:{type:String},
    about_company:{type:String},
    skills_required:{type:String},
    information:{type:String},
})


const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;