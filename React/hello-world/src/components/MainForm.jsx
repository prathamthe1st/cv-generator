import React, { useState } from 'react'
import '../App.css'
import logo from '../assets/logo.png'
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import WorkExp from './WorkExp';
import Projects from './Projects';
import OtherInfo from './OtherInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MainForm = ({ setResult }) => {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        linkedin: '',
        city: '',
        country: '',
    })
    const [educations, setEducations] = useState([])
    const [workExperiences, setWorkExperiences] = useState([])
    const [projects, setProjects] = useState([])
    const [otherInfo, setOtherInfo] = useState({
        skills: '',
        languages: '',
    })

    const [isFormValid, setIsFormValid] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleInfoChange = (event) => {
        const { name, value } = event.target;
        setOtherInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleEducationChange = (index, event) => {
        const { name, value } = event.target;
        const updatedEducations = [...educations];
        updatedEducations[index][name] = value;
        setEducations(updatedEducations);
    };
    const handleAddEducation = () =>
        setEducations([...educations, {
            id: educations.length + 1,
            universityName: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            degreeName: '',
            gpa: '',
            relevantCourses: '',
        }]);

    const handleRemoveEducation = (index) => {
        setEducations((prevEducations) =>
            prevEducations.filter((_, i) => i !== index)
        );
    };

    const handleWorkExperienceChange = (index, event) => {
        const { name, value } = event.target;
        const updatedWorkExperiences = [...workExperiences];
        updatedWorkExperiences[index][name] = value;
        setWorkExperiences(updatedWorkExperiences);
    };

    // Function for handling changes in project fields

    const handleAddWorkExperience = () => {
        setWorkExperiences((prevWorkExperiences) => [
            ...prevWorkExperiences,
            {
                id: prevWorkExperiences.length + 1,
                companyName: '',
                city: '',
                country: '',
                startDate: '',
                endDate: '',
                titlePositionHeld: '',
                workDescription: '',
            },
        ]);
    };

    const handleRemoveWorkExperience = (index) => {
        setWorkExperiences((prevWorkExperiences) =>
            prevWorkExperiences.filter((_, i) => i !== index)
        );
    };

    const handleProjectChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProjects = [...projects];
        updatedProjects[index][name] = value;
        setProjects(updatedProjects);
    };

    const handleAddProject = () => {
        setProjects((prevProjects) => [
            ...prevProjects,
            {
                id: prevProjects.length + 1,
                title: '',
                date: '',
                city: '',
                country: '',
                position: '',
                description: '',
            },
        ]);
    };

    const handleRemoveProject = (index) => {
        setProjects((prevProjects) =>
            prevProjects.filter((_, i) => i !== index)
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !personalInfo.name ||
            !personalInfo.email ||
            !personalInfo.mobile ||
            !personalInfo.linkedin ||
            !personalInfo.city ||
            !personalInfo.country ||
            !otherInfo.skills ||
            !otherInfo.languages
        ) {
            setIsFormValid(false);
            console.log("Form is invalid")
            return;
        }
        const data = {
            personalInfo,
            educations,
            projects,
            workExperiences,
            otherInfo,
        };
        axios
            .post("http://localhost:4000/cv", data, {})
            .then((res) => {
                if (res.data.message) {
                    setResult(res.data.data);
                    navigate("/cv");
                    console.log(res.data);
                }
            })
            .catch((err) => console.error(err));
    };
    return (
        <div className="form-container">
            <img src={logo} alt="Logo" className="logo" />
            <p className="form-description">
                The purpose of this Information Form is to understand your profile better. Please fill in the details with accuracy and try to avoid unnecessary information, only focus on the valuable parts of your experiences and mention key learnings and achievements.
            </p>
            {isFormValid && <p></p>}
            <form onSubmit={handleSubmit}>
                <PersonalInfo formData={personalInfo} handleInputChange={handleInputChange} />
                <Education
                    formData={{ educations }}
                    handleAddEducation={handleAddEducation}
                    handleRemoveEducation={handleRemoveEducation}
                    handleEducationChange={handleEducationChange}
                />
                <WorkExp
                    formData={{ workExperiences }}
                    handleWorkExperienceChange={handleWorkExperienceChange}
                    handleAddWorkExperience={handleAddWorkExperience}
                    handleRemoveWorkExperience={handleRemoveWorkExperience}
                />
                <Projects
                    formData={{ projects }}
                    handleProjectChange={handleProjectChange}
                    handleAddProject={handleAddProject}
                    handleRemoveProject={handleRemoveProject}
                />
                <OtherInfo formData={otherInfo} handleInputChange={handleInfoChange} />
                <div className="submit-container">
                    <button type="submit" onClick={handleSubmit} className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default MainForm