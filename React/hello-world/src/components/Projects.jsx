import React from 'react';
import '../form.css';

const Projects = ({ formData, handleProjectChange, handleAddProject, handleRemoveProject }) => {
    return (
        <>
            <div className="projects">
                <h2 className="group-heading">
                    <span className="label">D</span> Projects & Extra-curricular Experiences
                </h2>
                {formData.projects.map((project, index) => (
                    <>
                        <div key={index}>
                            {index > 0 && <div className="project-space" />}
                            <h3 className="project-heading">Project /Extra-curricular activity {index + 1}</h3>
                            <label>Project Title / Extra-curricular Activity Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={project.title || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            />

                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={project.date || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            />

                            <label>City:</label>
                            <input
                                type="text"
                                name="city"
                                value={project.city || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            />

                            <label>Country:</label>
                            <input
                                type="text"
                                name="country"
                                value={project.country || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            />

                            <label>Position held:</label>
                            <input
                                type="text"
                                name="position"
                                value={project.position || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            />
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={project.description || ''}
                                onChange={(event) => handleProjectChange(index, event)}
                            ></textarea>
                        </div>
                        <button className='add-buttons' onClick={() => handleRemoveProject(index)}>Delete</button>
                    </>
                ))}
            </div>
            <div className="add-project">
                <button type='button' className='add-buttons' onClick={handleAddProject}>
                    Add Project/ Extra-curricular experiences
                </button>
            </div>
        </>
    );
};


export default Projects