import React, { useEffect } from 'react'
import './CV.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png'
import { Packer } from "docx";
import DocumentCreator from "../cv-generator"; 
import { useNavigate } from 'react-router-dom';


const CV = ({ result }) => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
      };
    useEffect(() => {
        console.log(result)
        console.log(result.personalInfo)
        console.log(result.workExperiences)
        console.log(result.educations)
        console.log(result.projects)
        console.log(result.createExp)
        console.log(result.createProject)
    })

    function generateDocx() {
        const documentCreator = new DocumentCreator();
        toast("Download started")
        const doc = documentCreator.create([
            result.personalInfo,
            result.workExperiences,
            result.educations,
            result.projects,
            result.otherInfo
        ]);

        // Packer.toBlob(doc).then(blob => {
        //     console.log(blob);
        //     saveAs(blob, "example.docx");
        //     console.log("Document created successfully");
        // });

        Packer.toBlob(doc).then(blob => {
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "example.docx";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            console.log("Document created and downloaded successfully");
        });
    }
    return (
        <>
            <div className='result'>
                <div className='logo'>
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div>
                    <p>
                        Your Resume has been generated. Click the button to download your Resume
                    </p>
                </div>
                <div className='download'>
                    <button  onClick={generateDocx}>Download Resume</button>
                    <ToastContainer/>
                    <button onClick={navigateHome}>Create again</button>
                </div>
            </div>
        </>
    );
};

export default CV