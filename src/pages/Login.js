import React, { useEffect, useState } from 'react'
// import login from "../../assets/login.png"
import { loginAPI } from '../Networks/api';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("name") !== null) {
            navigate("/home")
        }
    }, [])
    const handleLogIn = () => {
        let data = {
            email, password: pass
        }
        loginAPI(data).then((data) => {
            if (data.err === 200) {
                swal("Success", data.msg, "success").then((ok) => {
                    navigate('/home');
                    localStorage.setItem("name", "QWQWQWQWQWQWQWQWQWQWWQQWQWWQQWQW")
                })
            } else {
                swal("Warning", data.msg, "warning")
            }
        })
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow p-4 mt-5">
                            <h2 className='text-center'>Welcome Yash </h2>
                            <input type="text" className='mt-3 form-control' placeholder='Enter Your Email' value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr("") }} />
                            <span className="text-danger">{emailErr}</span>
                            <input type="password" className='mt-3 form-control' placeholder='Enter Password' value={pass} onChange={(e) => { setPass(e.target.value); setPassErr("") }} />
                            <span className="text-danger">{passErr}</span>
                            <button className='btn btn-primary mt-4 rounded-pill' onClick={handleLogIn}>Log In</button>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}

export default Login;