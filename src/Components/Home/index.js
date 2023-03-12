import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { MdWavingHand } from 'react-icons/md'
import './index.css'



const Home = (props) => {
    const [name,setName] =useState('')


    const getUserDetails = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const url = 'https://fins-lock.onrender.com/userName'
        const option = {
            method: "GET",
            headers: {

                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, option)
        const data = await response.json()
        setName(data[0].userName)
        
    }

    useEffect(() => {
        getUserDetails()

    },[])
    const onClickLogout = () => {
        const { history } = props
        Cookies.remove('jwt_token')
        history.replace('/login')
    }

    return (
        <div className='home'>
            <div className='card-top'>
                <span className='logo-bg'><i> <AiOutlineUser className='logo' /></i></span>
                <span className='welcome'>Welcome! &nbsp;<span className='user-name'>{name}</span>  &nbsp;<MdWavingHand className='hand' /><MdWavingHand /></span>
                <button onClick={onClickLogout} className="logout-btn">Logout</button>
            </div>
            <div>
            </div>

        </div>
    )
}

export default Home