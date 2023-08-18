import React, { useEffect, useState } from 'react'
import { createProject, deleteProject, deleteSkill, getProjects, getSkills } from '../../Networks/api';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Skills = () => {
    const [skills, setSkills] = useState();
    useEffect(() => {
        getSkills().then((res) => {
            if (res.err === 200) {
                setSkills(res.data)
            }
        })
    }, []);
    let navigate = useNavigate();
    const handleDelete = (e, skillId) => {
        e.preventDefault();
        deleteSkill({ skillId }).then((res) => {
            if (res.err === 200) {
                swal("Success", res.msg, "success").then(() => {
                    getSkills().then((res) => {
                        if (res.err === 200) {
                            setSkills(res.data)
                        }
                    })
                })
            }
        })
    }
    const handleAddSkill = () => {
        navigate("/skill/add")
    }
    const columns = [
        {
            name: 'Sr.No',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Skill Heading',
            selector: row => row.heading,
        },
        {
            name: 'Action',
            selector: row => {
                return <>
                    <button className='btn btn-sm btn-warning me-1' onClick={() => navigate(`/skill/update/${row._id}`)}>Update</button>
                    <button className='btn btn-sm btn-danger' onClick={(e) => handleDelete(e, row._id)}>Delete</button>
                </>
            },
        },

    ];

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className='d-flex justify-content-between'>
                            <h4 className='text-center'>Skills</h4>
                            <button className='btn btn-sm btn-primary' onClick={handleAddSkill}>Add Skill</button>
                        </div>

                        <div>
                            <DataTable
                                className='border border-dark mt-4'
                                columns={columns}
                                data={skills}
                            />
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>

        </>

    )
}

export default Skills;
