import React from 'react'
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate=useNavigate();

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handle=()=>{
    if(!username || !email || !password){
      alert('Please fill all the fields')
      return
    }
    if(username==`${process.env.REACT_APP_USERNAME}` && email==`${process.env.REACT_APP_GMAIL}` && `$password=={process.env.REACT_APP_PASSWORD}`){
      localStorage.setItem('token',true)
      localStorage.setItem('username',username)
      localStorage.setItem('email',email)
      localStorage.setItem('password',password)
      navigate('/signup')
      return
    }
    else{
      alert("no match");
    }
  }
  return (
    <div className=''>
    <div className='text-white'>
      This form is not working till yet, go back
    </div>
      <form className=''>
      <input 
      className=''
      type='text'
      placeholder='Username'
      value={username}
      onChange={(e) => {
        setUsername(e.target.value)
      }}
      />
        <input
          className=''
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          />
          <input 
          className=''
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          />
      </form>
          <button className='' onClick={()=>handle()}>Signin</button>
    </div>
  )
}

export default Signin