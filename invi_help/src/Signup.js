import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const Signup = () => {
    const [name, setName] = React.useState('')
    const navigate = useNavigate();
    const [data, dataSet] = React.useState()
    const [data2, dataSet2] = React.useState()
    React.useEffect(() => {
        if (localStorage.getItem('token') !== "true" || localStorage.getItem('username') !== `${process.env.REACT_APP_USERNAME}` || localStorage.getItem('email') !== `${process.env.REACT_APP_GMAIL}` || localStorage.getItem('password') !== `${process.env.REACT_APP_PASSWORD}`) {
            alert("Warning! unauth access")
            navigate('/')
        }
    }, [])
    const handle = async () => {
        try {
            if (!name) {
                alert('Please fill all the fields')
                return
            }
            if (localStorage.getItem('token') !== "true" || localStorage.getItem('username') !== `${process.env.REACT_APP_USERNAME}` || localStorage.getItem('email') !== `${process.env.REACT_APP_GMAIL}` || localStorage.getItem('password') !== `${process.env.REACT_APP_PASSWORD}`) {
                alert("Warning! unauth access")
                return;
            }
            const datas = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${name}`);
            dataSet(JSON.stringify(datas.data));
            dataSet2(datas.data);


            return

        } catch (error) {
            alert(" no signup allowed")
            return;
        }
    }
    const down = async () => {
        try {
            const worksheet = XLSX.utils.json_to_sheet(data2.data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(blob, `invictus_${name}.xlsx`);
        }
        catch (error) {
            return;
        }
    }
    return (
        <>
            <div className='bg-black w-full h-[100vh] ml-2 mt-2 m-2'>
                <form className=''>
                    <input
                        className=''
                        type='text'
                        placeholder='name'
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </form>
                <button className='bg-white' onClick={() => { handle(); }}>Signup</button>
                <br />
                {data && <button className='bg-white' onClick={() => down()}>Down</button>}
                <div className='text-white'>
                    {`${data}`}
                    {/* {data && data.data &&`${data.data[0].key} : ${data.data[0].value}`} */}
                </div>
            </div>
        </>
    )
}

export default Signup