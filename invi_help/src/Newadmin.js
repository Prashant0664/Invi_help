import React, { useState } from 'react';
import { addadmin } from './helper';
import { useNavigate } from 'react-router-dom';
const Newadmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const addAdmin = async () => {
        try {
            if (!password || !email) {
                alert("please fill all the fields")
                return;
            }
            if (password.length < 6) {
                alert("password length should be greater than 6")
                return;
            }
            const response = await addadmin(email, password);
            if (response.data && response.data.data === "done") {
                alert("Signup successful, for admin access contact +919311450234 or +919810511869 ");
            }
            navigate('/adminlogin');
            return;
        } catch (error) {
            // Handle any other errors
            console.error('An error occurred', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addAdmin();
    };

    return (
        <>
            <div className='w-100% items-center'>

                <form onSubmit={handleSubmit} className='text-white flex flex-col m-auto items-center'>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="email-input text-black"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password ">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="password-input text-black"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <br />
                    <button className="submit p-2 text-black bg-white items-center m-auto " onClick={() => addAdmin()}>Submit</button>
                    <br />
                    <button className="submit p-2 text-black bg-white items-center m-auto " onClick={() => navigate("/adminlogin")}>Login</button>
                </form>
            </div>
        </>
    );
};

export default Newadmin