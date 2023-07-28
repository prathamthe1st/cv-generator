import React, { useEffect } from 'react'
import './CV.css'
import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocumentCreator from "../cv-generator"; // Assuming cv-generator.js exports the DocumentCreator class


const CV = ({ result }) => {
    useEffect(() => {
        console.log(result)
        console.log(result.personalInfo)
        console.log(result.workExperiences)
        console.log(result.educations)
        console.log(result.projects)
    })

    function generateDocx() {
        const documentCreator = new DocumentCreator();
        const doc = documentCreator.create([
            result.personalInfo,
            result.workExperiences,
            result.educations,
            result.projects
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
            <div>
                <p>
                    Start editing to see some magic happen :)
                    <button onClick={generateDocx}>Generate CV with docx!</button>
                </p>
            </div>
        </>
    );
};

export default CV