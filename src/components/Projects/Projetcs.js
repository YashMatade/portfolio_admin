import React, { useEffect, useState } from 'react'
import { createProject, deleteProject, getProjects } from '../../Networks/api';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Projetcs = () => {
    const [projects, setProjects] = useState();
    useEffect(() => {
        getProjects().then((res) => {
            if (res.err === 200) {
                setProjects(res.data)
            }
        })
    }, []);
    let navigate = useNavigate();
    const handleDelete = (e, projectId) => {
        e.preventDefault();
        deleteProject({ projectId }).then((res) => {
            if (res.err === 200) {
                swal("Success", res.msg, "success").then(() => {
                    getProjects().then((res) => {
                        if (res.err === 200) {
                            setProjects(res.data)
                        }
                    })
                })
            }
        })
    }
    const handleAddProject = () => {
        navigate("/project/add")
    }
    const columns = [
        {
            name: 'Sr.No',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Project Name',
            selector: row => row.projectName,
        },
        {
            name: 'Project Desc',
            selector: row => row.description,
        },
        {
            name: 'Action',
            selector: row => {
                return <>
                    <button className='btn btn-sm btn-warning me-1' onClick={() => navigate(`/project/update/${row._id}`)}>Update</button>
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
                            <h4 className='text-center'>Projects</h4>
                            <button className='btn btn-sm btn-primary' onClick={handleAddProject}>Add project</button>
                        </div>

                        <div>
                            <DataTable
                                className='border border-dark mt-4'
                                columns={columns}
                                data={projects}
                            />
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>

        </>

    )
}

export default Projetcs;
