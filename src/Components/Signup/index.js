import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'
import { v4 } from 'uuid';


const Signup = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [confirm, setConfirm] = useState('')
    const [toggle, setToggle] = useState('password')
    const [loading, setLoading] = useState('false')


    const SignupForm = async (e) => {
        e.preventDefault();
        if (name === "" && email === " " && (userPass !== confirm)) {
            setError('In valid Details')
        }
        else {
            const userApi = 'https://fins-lock.onrender.com/add'
            const userDetails = {
                userName: name,
                email: email,
                password: userPass,
                confirmPassword: confirm,
                id: v4()
            }
            const options =
            {
                method: 'POST',
                body: JSON.stringify(userDetails),
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
            const response = await fetch(userApi, options)
            const data = await response.json()
            console.log(data, 's-data')
            if (data.status === true) {
                const { history } = props
                history.replace('/login')
            }
            else {
                setError('In valid Details')
                setLoading(true)
            }

        }
    }


    const clickEye = () => {
        if (toggle === 'password') {
            setToggle('text')
            setLoading(false)
        } else {
            setToggle('password')
            setLoading(true)
        }
    }


    return (
        <div className='signup'>
            <div className='card'>
                <div className='card-top'>
                    <span className='logo-card'> <img src="https://i.ibb.co/K2xtvb9/ic-user-2x.png" alt="logo" className='logo-user' /></span>
                    <span className='welcome'>Welcome!</span>

                </div>
                <div className='form-card'>
                    <form className='form' autoComplete="off" onSubmit={SignupForm}>
                        <div className='input-div'>
                            <label htmlFor="name"  >username</label>
                            <input type="text" id="name" placeholder='UserName' value={name} onChange={(e) => setName(e.target.value)} />

                        </div>
                        <div className='input-div password-field'>
                            <label htmlFor="email" >email</label>
                            <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className='input-d password-field'>
                            <label htmlFor="password" >Password</label>
                            <input type={toggle} id="password" value={userPass} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <i className='eye-icon' onClick={clickEye}>{loading ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</i>
                        </div>
                        <div className='input-d'>
                            <label htmlFor="password" >Confirm Password</label>
                            <input type="text" id="password" value={confirm} placeholder='password' onChange={(e) => setConfirm(e.target.value)} />
                        </div>
                        <div className='input-div password-field'>
                            <button className='login-btn' type='submit'>Sign Up</button>
                            <span className='errMessage'>{Error}</span>
                        </div>
                        <Link to="/login">
                            <p className='back'><BiArrowBack /> &nbsp; &nbsp; Back to Login Page</p>
                        </Link>
                        {/* <a href="/login"> </a> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup

