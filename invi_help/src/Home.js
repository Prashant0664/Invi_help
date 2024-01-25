import React from 'react'
import axios from 'axios'
import { getGenData, getevenlist } from './helper/index'
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import "./App.css"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { geteventreg } from './helper/index';
const Home = () => {
  const navigate=useNavigate();

    const [gdata, setgData] = React.useState([]);
    const [showg, setShowg] = React.useState(false);
    const [gkeys, setgKeys] = React.useState([]);
    const [eventdata, seteventdata] = React.useState([]);
    const [eventreg, seteventreg] = React.useState([]);
    const [showeg, setShoweg] = React.useState(false);
    const geteventregf = async () => {
        try {
            const data = await geteventreg();
            seteventreg(data.data);
            setShoweg(true);
            return data.data;
        }
        catch (error) {
            // alert("error occurred")
            return { error: "error" };
        }
    }
    const closerg = () => {
        setShoweg(false);
    }
    const exportToExcel = async () => {
        try {
            const data = await getevenlist();
            seteventdata([data.data.data]);

            const worksheet = XLSX.utils.json_to_sheet(eventdata[0]);
            const workbook = XLSX.utils.book_new();
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
            return;
        } catch (error) {
            alert("error occurred")
            return;
        }
    }
    const hgdata = async () => {
        setShowg(false);
    }
    return (
        <>
        <div className='bg-white m-auto w-[350px]'>
      'Complete Data Fetching may take time, wait for while after clicking the button'
            {/* ------------------- */}
            {showg ? <>
                <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { hgdata();
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
                <button className='mt-2 p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { generalData();
                  }}>
                    General Stats
                </button>
                <br />
            </>}

            {/* ------------------- */}

            {!showeg ? <>

                <br />
                <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { geteventregf();
                 }}>
                    Events Registration Count
                </button>
                <br />
            </> :
                <>

                    <br />
                    <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { closerg(); 
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
                                        <tr key={index} className=' border border-solid border-black'>
                                            <td className='border border-solid border-black pl-2'>{eventn.name}</td>
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
            <button className='p-2 m-auto flex bg-green-300 justify-center items-center' onClick={() => { exportToExcel();}}>
                Download Event Basic Detail
            </button>
            <br />
        </div>

      <button className='bg-black text-black' onClick={()=>{ navigate("/signin") }}>
        Signin
      </button>
      </>
    )
}

export default Home
