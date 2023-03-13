import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect,Link } from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [userPass, setPassword] = useState('')
    const [mailError, setMailError] = useState('')
    const [passError, setPassError] = useState('')
    const [toggle,setToggle] = useState('password')
    const [loading, setLoading] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        const userApi = 'https://fins-lock.onrender.com/login'
        const userDetails = {
            email: email,
            password: userPass,
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
        console.log(data,'dd')
        if (response.ok === true) {
            setLoading(false)
            const jwtToken = data.jwtToken
            setMailError('')
            setPassError('')
            localStorage.setItem("status", false,)
            Cookies.set('jwt_token', jwtToken, {
                expires: 30,
                path: '/',
            })
            setPassword('')
            setEmail('')
            const { history } = props
            history.replace('/')
        }
        else {
           
            const msg = data['msg']
            
            if (msg === "password must be 8 character long") {
                setPassError(msg)
            }
            else {
                setMailError(msg)
            }
            setLoading(false)

        }
    }
   
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
        return <Redirect to="/" />   
    }
    const changeColor = () =>{
        if (mailError.length!==0){
            console.log('colo')
            return "changeColor" 
        } 
    }
    const changelabel =() =>{
        console.log('la')
        if (mailError.length !== 0) {
            return "labelColor"
        }
    }
    const clickIcon = () => {
        if (toggle === 'password'){
            setToggle('text')
            setLoading(true)
        }else{
            setToggle('password')
            setLoading(false)
        }
    }
    return (
        <div className='login'>
       
            <div className='card'>
                
                <div className='card-top'>
                    <span className='logo-card'> <img src="https://i.ibb.co/K2xtvb9/ic-user-2x.png" alt="logo"  className='logo-user'/></span>
                    <span className='welcome'>Welcome!</span>
                    <p className='caption'>Let's connect to your workspace. <br /> Please enter your email to continue</p>
                </div>
                <div className='form-card '>
                    <form className='form' autoComplete="off" onSubmit={submitForm}>
                        <div className='input-d'>
                            {email && <label htmlFor="email" className={changelabel()} >Email Address</label>}
                            <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className={changeColor()} />
                            {mailError && <span className='err-message'>{mailError}</span>}
                        </div>
                        
                        <div className='input-div password-field'>
                            {userPass ? <label htmlFor="password" className={changelabel()}>Password</label>:<span className='label_placeholder'></span>}
                            <input type={toggle} id="password" value={userPass} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className={changeColor()} />
                            <i className='paswd-icon' onClick={clickIcon}>{loading ? <AiOutlineEye /> :<AiOutlineEyeInvisible />}</i>
                            <Link to="/signup"> <span className='f-password'>Forgot Password?</span></Link>
                            {passError && <span className='err-message'>{passError}</span>}
                           
                            {passError && userPass.length>8 && <span>ok</span>}
                        </div>
                        <div className='input-d'>
                            <button type='submit' className='login-btn' disabled={loading}>{loading ? <Loader type="TailSpin" color="white" height="25" width="25" /> : 'Sign in'}</button>
                        </div>
                        <Link to={`/signup`} >
                            <p>Don't have  an  Account?</p>
                        </Link>
                    </form>
                    <div className='footer'>
                        <p><span className='and'>Powered by </span>  <img src="https://i.ibb.co/VVWj11P/zaperon-logo-2x.png" alt="power" className='powerd' /></p>
                        <div className='footer-child'>
                            <p className='blue'>Need Help?</p>
                            <p className='blue'>Privacy Policy <span className='and'>& </span>Terms</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login

  