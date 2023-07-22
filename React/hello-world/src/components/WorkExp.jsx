import React from 'react';
import '../form.css';

const WorkExp = ({
    formData,
    handleAddWorkExperience,
    handleWorkExperienceChange,
    handleRemoveWorkExperience,
}) => {

    return (
        <>
            <div className="work-experience">
                <h2 className="group-heading">
                    <span className="label">C</span> Work Experience
                </h2>
                {formData.workExperiences.map((experience, index) => (
                    <div key={experience.id}>
                        {index > 0 && <div className="work-experience-space" />}
                        <h3 className="work-experience-heading">Work Experience {index + 1}</h3>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={experience.companyName || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={experience.city || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={experience.country || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={experience.startDate || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={experience.endDate || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>Title/Position Held:</label>
                        <input
                            type="text"
                            name="titlePositionHeld"
                            value={experience.titlePositionHeld || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        />

                        <label>Work Description:</label>
                        <textarea
                            name="workDescription"
                            value={experience.workDescription || ''}
                            onChange={(event) => handleWorkExperienceChange(index, event)}
                        ></textarea>

                        <button type='btn' onClick={() => handleRemoveWorkExperience(index)}>Delete</button>
                    </div>
                ))}

                <div className="add-work-experience">
                    <button type='btn' onClick={handleAddWorkExperience}>
                        Add Work Experience
                    </button>
                    {/* Show error messages if needed */}
                </div>
            </div>
        </>
    );
};

export default WorkExp;
