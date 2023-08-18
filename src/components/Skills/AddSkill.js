import React, { useState } from 'react';
import swal from 'sweetalert';
import { createProject, createSkill } from '../../Networks/api';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
    const [heading, setHeading] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillImage, setSkillImg] = useState('');
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState(['']);

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
        addSkill(value);
    };

    const handleAddInput = (e) => {
        e.preventDefault();
        setInputValues([...inputValues, '']);
    };

    const handleRemoveInput = (index) => {
        const newInputValues = [...inputValues];
        newInputValues.splice(index, 1);
        setInputValues(newInputValues);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!heading || skills.length === 0) {
            swal('Warning', 'All fields required', 'warning');
        } else {
            const formData = new FormData();
            formData.append('heading', heading);
            inputValues.forEach(value => {
                formData.append('skills[]', value);
            });
            // formData.append('skillImage', skillImage);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };
            createSkill(formData, config).then((res) => {
                if (res.err === 200) {
                    swal('Success', res.msg, 'success').then((ok) => {
                        navigate('/skills');
                    });
                } else {
                    swal('Warning', res.msg, 'warning');
                }
            });
        }
    };

    const addSkill = (newSkill) => {
        setSkills([...skills, newSkill]);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className=" mt-5 p-5 shadow">
                            <form>
                                <h4>Add Skill</h4>
                                <input
                                    type="text"
                                    onChange={(e) => setHeading(e.target.value)}
                                    className="form-control mb-2"
                                    placeholder="Project Name"
                                />
                                {inputValues.map((value, index) => (
                                    <div key={index} className='form-row mb-2'>
                                        <div className='input-group'>
                                            <input type='text' placeholder='Skill Name' value={value} className='form-control' onChange={(e) => handleInputChange(index, e.target.value)} /><button className='btn btn-danger' onClick={() => handleRemoveInput(index)}>-</button>
                                        </div>
                                    </div>
                                ))}
                                <button className='btn btn-primary mb-2' onClick={handleAddInput}>+</button>
                                {/* <input
                                    type="file"
                                    onChange={(e) => setSkillImg(e.target.files[0])}
                                    className="mb-2 form-control"
                                    placeholder="Project Image"
                                /> */}
                                <button onClick={submit} className="btn btn-primary w-100">
                                    Add Skill
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    );
};

export default AddSkill;
