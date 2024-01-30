import React, { useState } from 'react';
import { checkifadmin } from './helper';
import { useNavigate } from 'react-router-dom';
import { getGenData, getevenlist, geteventreg, download } from './helper/index'
import "./App.css"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const Adminlogin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [gdata, setgData] = React.useState([]);
    const [showg, setShowg] = React.useState(false);
    const [gkeys, setgKeys] = React.useState([]);
    const [eventdata, seteventdata] = React.useState([]);
    const [eventreg, seteventreg] = React.useState([]);
    const [showeg, setShoweg] = React.useState(false);
    const [sl, setsl] = React.useState(false);
    const [sl1, setsl1] = React.useState(false);
    const [sl2, setsl2] = React.useState(false);
    const [sf, setsf] = React.useState(true);
    const geteventregf = async () => {
        try {
            setsl1(true);
           // const data = await geteventreg();
            seteventreg([
                {
                    name: 'Ui/Ux Designer',
                    cnt: 10
                }
            ]);
            setShoweg(true);
            setsl1(false);
           // return data.data;
        }
        catch (error) {
            // alert("error occurred")
            return { error: "error" };
        }
    }
    const closerg = () => {
        setShoweg(false);
    }
    const getExcel = async(name) =>{
        try{
            const response = await download(name);
            console.log(name, response);
            if(response.error){
                alert("error in downloading....");
            }
            const excelBuffer = new Uint8Array(response.data.buffer.data);

            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(blob, `${name}.xlsx`);
            
        }
        catch (error) {
            // alert("error occurred")
            return;
        }
    }
    const exportToExcel = async () => {
        try {
            setsl2(true);
            const data = await getevenlist();
            seteventdata([data.data.data]);
            // console.log(data.data.data);
            const worksheet = XLSX.utils.json_to_sheet(eventdata[0]);
            const workbook = XLSX.utils.book_new();
            setsl2(false);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(blob, "dataofinvictusevents.xlsx");
        } catch (error) {
            // alert("error occurred")
            return;
        }
    };
    const generalData = async () => {
        try {
            setsl(true);
            const data = await getGenData();

            setgData({
                "Total Events+Workshops": data.data["Total Events+Workshops"],
                "Total Events": data.data["Total Events"],
                "Total Workshops": data.data["Total Workshops"],
                "Total Registered on Website": data.data["Total Registered on Website"],
                "Total Teams": data.data["Total Teams"],
                "Total Teams Submitted": data.data["Total Teams Submitted"],
                "Total Teams Not Submitted": data.data["Total Teams Not Submitted"],
                "Total Unique Teams/Submission etc.": data.data["Total Unique Teams/Submission etc."],
                "Overall total events and workshop on 9": data.data["Overall total events and workshop on 9"],
                "Overall total events and workshop on 10": data.data["Overall total events and workshop on 10"],
                "Overall total events and workshop on 11": data.data["Overall total events and workshop on 11"],
                "Overall total events and workshop on 12": data.data["Overall total events and workshop on 12"],
                "Overall total events and workshop on 13": data.data["Overall total events and workshop on 13"],
                "Total Events on 9": data.data["Total Events on 9"],
                "Total Events on 10": data.data["Total Events on 10"],
                "Total Events on 11": data.data["Total Events on 11"],
                "Total Events on 12": data.data["Total Events on 12"],
                "Total Events on 13": data.data["Total Events on 13"],
                "Total Workshops on 9": data.data["Total Workshops on 9"],
                "Total Workshops on 10": data.data["Total Workshops on 10"],
                "Total Workshops on 11": data.data["Total Workshops on 11"],
                "Total Workshops on 12": data.data["Total Workshops on 12"],
                "Total Workshops on 13": data.data["Total Workshops on 13"],
                "Total colleges": data.data["Total colleges"],
                "Colleges": data.data["Colleges"],
            });
            setShowg(true);
            setgKeys(Object.keys(gdata));
            setsl(false);
            return;
        } catch (error) {
            alert("error occurred")
            return;
        }
    }
    const hgdata = async () => {
        setShowg(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await checkifadmin(name, password);
            // console.log("notlog", response)
            if(response.data &&  response.data.data)setsf(true);
            // await checkadmin(name, password);
        } catch (error) {
            setsf(false);
            // console.error(error);
        }
    };

    return (
        <>
            {!sf?<form onSubmit={handleSubmit} className='m-4'>
                <input
                    type="text"
                    placeholder="Mail"
                    className="bg-black text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-black text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-white text-black">
                    Log-in
                </button>
                <br />
                <br />
                <button className='bg-white text-black' onClick={() => navigate('/newadmin')}>Signup</button>
            </form>:
            <div className='text-black'>
                <>
                    <div className='bg-white m-auto w-[350px]'>
                        'Complete Data Fetching may take time, wait for while after clicking the button, click again on button for more detail'
                        {/* ------------------- */}
                        {showg ? <>
                            <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => {
                                hgdata();
                            }}>
                                Hide Data
                            </button>
                            <br />
                            <div className=''>
                                <table className='border border-solid border-black'>
                                    <thead>
                                        <tr>

                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {gkeys.map((key, index) => {
                                            if (key != 'Colleges')
                                                return (
                                                    <>
                                                        <tr key={index} className=' border border-solid border-black'>
                                                            <td className='border border-solid border-black pl-2'>{key}</td>
                                                            <td className='border border-solid border-black w-[80px] text-center'>{gdata[key]}</td>
                                                        </tr>
                                                    </>
                                                )
                                        })}
                                    </tbody>
                                </table>
                                <br />
                                <b>Colleges</b>
                                <table className='border border-solid border-black'>
                                    <thead>
                                        <tr>

                                        </tr>
                                    </thead>
                                    <tbody className='m-[40px] '>
                                        {gdata.Colleges.map((college, index) => {
                                            return (
                                                <>
                                                    <tr key={index} className=' border border-solid border-black'>
                                                        <td className='border border-solid border-black pl-2'>{college.name}</td>
                                                        <td className='border border-solid border-black w-[80px] text-center'>{college.cnt}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div></> : <>
                            <button className='mt-2 p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => {
                                generalData();
                            }}>
                                {!sl ? "General Stats" : "Stats Loading..."}
                            </button>
                            <br />
                        </>}

                        {/* ------------------- */}

                        {!showeg ? <>

                            <br />
                            <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => {
                                geteventregf();
                            }}>
                                {!sl1 ? "Download Participant List" : "Registration Loading..."}
                            </button>
                            <br />
                        </> :
                            <>

                                <br />
                                <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => {
                                    closerg();
                                }}>
                                    Close Registration Count
                                </button>
                                <table className='border border-solid border-black'>
                                    <thead>
                                        <tr>

                                        </tr>
                                    </thead>
                                    <tbody className='m-[40px] '>
                                        {eventreg && eventreg.map((eventn, index) => {
                                            return (
                                                <>
                                                    <tr key={index} className=' border border-solid border-black' onClick={()=>{
                                                        getExcel(eventn.name);
                                                    }}>
                                                        <td className='border border-solid border-black pl-2 cursor-pointer'>{eventn.name}</td>
                                                        <td className='border border-solid border-black w-[80px] text-center'>{eventn.cnt}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </>
                        }
                        <br />
                        <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { exportToExcel(); }}>
                            {!sl2 ? "Download Event Basic Detail" : "Downloading..."}
                        </button>
                        <br />
                    </div>


                </>
            </div>}
        </>
    );
};

export default Adminlogin