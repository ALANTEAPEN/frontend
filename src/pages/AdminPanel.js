import { useState } from "react";
import api from "../api";

export default function AdminPanel() {
  const [data,setData]=useState({
    name:"",venue:"",price:0,availableTickets:0,date:""
  });

  const create=async()=>{
    await api.post("/concerts",data,{
      headers:{Authorization:"Bearer "+localStorage.token}
    });
    alert("Concert created");
  };

  return (
    <div style={{padding:20}}>
      <h2>Create Concert</h2>

      <input placeholder="Name"
        onChange={e=>setData({...data,name:e.target.value})}/>
      <br/><br/>

      <input placeholder="Venue"
        onChange={e=>setData({...data,venue:e.target.value})}/>
      <br/><br/>

      <input placeholder="Price"
        onChange={e=>setData({...data,price:e.target.value})}/>
      <br/><br/>

      <input placeholder="Tickets"
        onChange={e=>setData({...data,availableTickets:e.target.value})}/>
      <br/><br/>

      <button onClick={create}>Create</button>
    </div>
  );
}