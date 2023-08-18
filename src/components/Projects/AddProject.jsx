import React, { useState } from 'react'
import swal from 'sweetalert';
import { createProject } from '../../Networks/api';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [projectName, setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectImg, setProjectImg] = useState();
    const [projectUrl, setProjectUrl] = useState();
    const [techUsed, setTechUsed] = useState("");
    const [inputValues, setInputValues] = useState(['']);
    let navigate = useNavigate();
    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

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
        let tech = Array(techUsed?.split(","))
        if (!projectName || !projectDesc || !projectUrl) {
            swal("Warning", "All fields required", "warning");
        } else {
            let formData = new FormData();
            formData.append("projectName", projectName);
            formData.append("description", projectDesc);
            inputValues.forEach(value => {
                formData.append(`techUsed[]`, value);
            })
            // formData.append("projectImg", projectImg);
            formData.append("projecturl", projectUrl);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            };

            createProject(formData, config).then((res) => {
                if (res.err === 200) {
                    swal("Success", res.msg, "success").then((ok) => {
                        navigate("/projects")
                    })
                } else {
                    swal("Warning", res.msg, "warning")
                }
            })
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="card mt-5 p-5 shadow">
                            <form action="">
                                <h4>Add project</h4>
                                <input type="text" onChange={(e) => setProjectName(e.target.value)} className='form-control mb-2' placeholder='Project Name' name="" id="" />
                                <textarea type="text" onChange={(e) => setProjectDesc(e.target.value)} className='mb-2 form-control' name="" id="" placeholder='Project Description' />
                                {/* <input type="file" onChange={(e) => setProjectImg(e.target.files[0])} className="mb-2 form-control" placeholder='Project Image' /> */}
                                {inputValues.map((value, index) => (
                                    <div key={index} className='form-row mb-2'>
                                        <div className='input-group'>
                                            <input type='text' placeholder='Project Technologies Used' value={value} className='form-control' onChange={(e) => handleInputChange(index, e.target.value)} /><button className='btn btn-danger' onClick={() => handleRemoveInput(index)}>-</button>
                                        </div>
                                    </div>
                                ))}
                                <button className='btn btn-primary mb-2' onClick={handleAddInput}>+</button>
                                <input type="text" placeholder='Project Hosted URL' className='mb-2 form-control' onChange={(e) => setProjectUrl(e.target.value)} />
                                <button onClick={submit} className='btn btn-primary w-100'>Add Project</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}

export default AddProject;
