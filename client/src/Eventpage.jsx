import axios from 'axios';
import React, { useState } from 'react'
import { FaFile } from 'react-icons/fa6';

const Eventpage = () => {
  const [name,setName]=useState("");
  const [date,setDate]=useState("");
  const [day,setDay]=useState("");
  const [time,setTime]=useState("");
  const [plink,setPlink]=useState("");
  const [addedPhotos,setAddedphotos]=useState([]);

  const addpbylink=async(ev)=>{
    ev.preventDefault();
    const {data:filename}=await axios.post("http://localhost:5000/upload-by-link",{link:plink});
    setAddedphotos(prev=>{
       return [...prev,filename];
    })
    setPlink("");
  }

  const uploadPhoto=(ev)=>{
    ev.preventDefault();
    const files=ev.target.files;
    const data=new FormData();
    for(let i=0;i<files.length;i++){
      data.append("photo",files[i]);
    }
    axios.post("http://localhost:5000/uploads",data,{
      headers: {'Content-Type':'multipart/form-data'}
    }).then(res=>{
      const {data:filenames}=res;
      setAddedphotos(prev=>{
        return [...prev,...filenames];
      });
    })
  }

  const addevent=async(ev)=>{
    ev.preventDefault();
    const data={
      name,
      date,
      day,
      time,
      addedPhotos
    }
    await axios.post("http://localhost:5000/events",data).then(()=>{
      alert("data added. Thank you!");
    });
  }

  return (
    <div className='flex flex-col justify-center items-center'>
        <h2 className=' mt-9 w-60 text-center bg-blue-300 py-3 text-2xl rounded-2xl'>Eventpage</h2>
        <form className='mt-10 h-auto border-solid border-2 border-sky-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addevent}>
            <input type='text' placeholder='Enter the event name' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev)=>{
              setName(ev.target.value);
            }}/>
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev)=>{
              setDate(ev.target.value);
            }}/>
            <input type='text' placeholder='Enter the day of the event' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev)=>{
              setDay(ev.target.value);
            }}/>
            <input type='time' placeholder='Enter the time of the event' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev)=>{
              setTime(ev.target.value);
            }}/>
            <div className='w-full gap-2 flex justify-center'>
              <input type='text' placeholder='Enter the link of the image' className='border-solid border-2 border-sky-500 w-8/12 px-2 py-2 rounded-xl' value={plink} onChange={(ev)=>{
                setPlink(ev.target.value);
              }}/>
              <button className='bg-blue-600 text-white px-2 py-2 rounded-xl cursor-pointer' onClick={addpbylink}>Add Photo</button>
            </div>
            <div className='flex gap-5'>
              <div className='flex items-center gap-3'>
                {addedPhotos.length > 0 && addedPhotos.map(link=>(
                    <div className='' key={link}>
                      <img src={'http://localhost:5000/uploads/'+link} alt='' className='rounded-xl' width="150px" height="100px"/>
                    </div>
                ))}
              </div>
              <label className='p-10 border-solid border-2 border-sky-500 rounded-xl cursor-pointer'>
                <input type='file' className='hidden' multiple onChange={uploadPhoto}/>
                <div><FaFile/></div>
              </label>
            </div>
            <input type='submit' className='bg-blue-600 w-96 p-2 rounded-xl cursor-pointer text-white'/>
        </form>
    </div>
  )
}

export default Eventpage