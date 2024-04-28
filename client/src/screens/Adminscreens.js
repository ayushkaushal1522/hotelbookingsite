import React ,{useState, useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Swal from "sweetalert2"

const Adminscreens = () => {

  useEffect(() => {
   if(!JSON.parse(localStorage.getItem("currentuser")).isadmin){
      window.location.href="/home"
   }
  
    
  }, [])

  


    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const items = [
        {
          key: '1',
          label: 'Bookings',
          children: <Bookings/>,
        },
        {
          key: '2',
          label: 'Rooms',
          children: <Rooms/>,
        },
        {
            key: '3',
            label: 'Add Rooms',
            children:<Addroom/>,
        },
        {
            key: '4',
            label: 'Users',
            children: <Uservalues />,
          }
      ];
      return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{fontSize:"20px"}}>Admin Panel</h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
      )
}

export default Adminscreens


export function Bookings() {

   const [bookings,setBookings] = useState([]);
   const [loading,setLoading] = useState();
   const [error,setError] = useState();
   useEffect(() => {
    
    
    async function getbookings(){
        try {
            setLoading(true)
            const data = await (await axios.get("https://yellow-journalist-zytev.pwskills.app:8080/api/bookings/getallbookings")).data
            setBookings(data);
            console.log(bookings);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
            
        }
    }
    getbookings();
     
   }, [])
   
    return (
      <div className='row'>
          <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && <Loading/>}

                <table className='table table-bordered table-dark'>
                  <thead className='bs'>
                    <tr>
                      <th>Booking Id</th>
                      <th>User Id</th>
                      <th>Room</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.length && (bookings.map(booking=>{
                      return <tr>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
                      </tr>
                    }))}
                  </tbody>
                </table>
                
            
          </div>
      </div>
    )
  }

  export function Rooms() {

    const [rooms,setRooms] = useState([]);
    const [loading,setLoading] = useState();
    const [error,setError] = useState();
    useEffect(() => {
     
     
     async function getrooms(){
         try {
             setLoading(true)
             const data = await (await axios.get("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/getallrooms")).data
             setRooms(data);
             setLoading(false)
         } catch (error) {
             console.log(error);
             setLoading(false)
             setError(true)
             
         }
     }
     getrooms();
      
    }, [])
    
     return (
       <div className='row'>
           <div className="col-md-12">
                 <h1>Rooms</h1>
                 {loading && <Loading/>}
 
                 <table className='table table-bordered table-dark'>
                   <thead className='bs'>
                     <tr>
                       <th>Room Id</th>
                       <th>Name</th>
                       <th>Type</th>
                       <th>Rent Per Day</th>
                       <th>Max Count</th>
                       <th>Phone Number</th>
                     </tr>
                   </thead>
 
                   <tbody>
                     {rooms.length && (rooms.map(room=>{
                       return <tr>
                         <td>{room._id}</td>
                         <td>{room.name}</td>
                         <td>{room.type}</td>
                         <td>{room.rentperday}</td>
                         <td>{room.maxcount}</td>
                         <td>{room.phonenumber}</td>
                       </tr>
                     }))}
                   </tbody>
                 </table>
                 
             
           </div>
       </div>
     )
   }


   export function Uservalues(){

        const [users,setUsers] = useState([]);
        const [loading,setLoading] = useState();
        const [error,setError] = useState();
        useEffect(() => {
        
        
        async function getusers(){
            try {
                setLoading(true)
                const data = await (await axios.get("https://yellow-journalist-zytev.pwskills.app:8080/api/users/getallusers")).data
                setUsers(data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
                
            }
        }
        getusers();
          
        }, [])

        return(
          <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && <Loading/>}
                <table className='table table-dark table-bordered'>
                    <thead>
                      <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>isAdmin</th>
                      </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user=>{
                          return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isadmin?"YES":"NO"}</td>
                          </tr>
                        })}
                    </tbody>
                </table>

            </div>
          </div>
        
        )


   }

   export function Addroom(){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    const [name,setName] = useState('');
    const [rentperday,setRentperday] = useState();
    const [maxcount,setMaxcount] = useState();
    const [description, setDescription] = useState();
    const [type,setType] = useState();
    const [phonenumber,setPhonenumber] = useState();
    const [imageurl1 ,setImageurl1] = useState()
    const [imageurl2 ,setImageurl2] = useState()
    const [imageurl3 ,setImageurl3] = useState()

    async function addroom(){
      const newroom ={
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imageurls:[imageurl1,imageurl2,imageurl3]
      }
      try {
        setLoading(true)
        const result = await( await axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/addroom",newroom)).data;
        console.log(result);
        setLoading(false)
        Swal.fire("Congrats" , "Your New Room Added Successfully" ,"success").then(result=>{
          window.location.href="/home"
        })
      } catch (error) {
        console.log(error);
        setLoading(false);
        Swal.fire("Oops" , "Something went wrong" , "error")
      }
    }
      return  (<div className='row'>
                  {loading && <Loading />}
                  <div className="col-md-5">
                      
                      <input type="text" className='form-control' placeholder='room name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='rent per day' value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='maxcount' value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='phone number' value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}/>
                  </div>
                  <div className="col-md-5">
                      <input type="text" className='form-control' placeholder='type' value={type} onChange={(e)=>{setType(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='Image URL 1' value={imageurl1} onChange={(e)=>{setImageurl1(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='Image URL 2'value={imageurl2} onChange={(e)=>{setImageurl2(e.target.value)}}/>
                      <input type="text" className='form-control' placeholder='Image URL 3' value={imageurl3} onChange={(e)=>{setImageurl3(e.target.value)}}/>
                      <div className='text-right'>
                        <button className='btn btn-primary mt-2' onClick={addroom}>Add Room</button>
                      </div>
                  </div>
              </div>)
   }