import React ,{useState , useEffect}from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Swal from "sweetalert2"
import { Divider, Flex, Tag } from 'antd';
const Profilescreen = () => {

    const user = JSON.parse(localStorage.getItem("currentuser"))

    useEffect(() => {
      if(!user){
        window.location.href="/login"
      }
    }, [])
    
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
          key: '1',
          label: 'My Profile',
          children: <MyProfile />,
        },
        {
          key: '2',
          label: 'My Bookings',
          children: <MyBookings/>,
        }
      ];
  return (
    <div className='ml-3 mt-3'>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default Profilescreen;



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentuser"))
    const [bookings,setBookings] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();
    useEffect(() => {
      async function getbooked(){
        try {
            setLoading(true)
            const data = await (await axios.post('https://yellow-journalist-zytev.pwskills.app:8080/api/bookings/getbookingsbyuserid',{userid:user._id})).data
            console.log(data)
            setBookings(data);
            setLoading(false);
          } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true);
          }
      }
      getbooked();
    }, [])

    async function cancelbooking(bookingid , roomid){
      try {
        setLoading(true)
        const result = await (await axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/bookings/cancelbooking",{bookingid , roomid})).data
        console.log(result);
        setLoading(false)
        Swal.fire("Congrats","Your Booking has been Cancelled","success").then(result=>{
          window.location.reload()
        })
      } catch (error) {
        console.log(error)
        setLoading(false) 
        Swal.fire("Oops","Something went Wrong","Error")
      }
    }
    
  return (
    <div>
        <div className="row">
            <div className="col-md-6">
                {loading && (<Loading />)}
                {bookings && (bookings.map(booking=>{
                    return <div className='bs'>
                        <h1>{booking.room}</h1>
                        <p><b>BookingId</b> : {booking._id}</p>
                        <p><b>CheckIn</b> : {booking.fromdate}</p>
                        <p><b>CheckOut</b> : {booking.todate}</p>
                        <p><b>Amount</b> : {booking.totalamount}</p>
                        <p><b>Status </b>: {booking.status=='Booked'?(<Tag color="green">CONFIRMED</Tag>):(<Tag color="red">CANCELLED</Tag>) }</p>
                        {booking.status!=="CANCELLED" && (
                          <div className='text-right'>
                            <button className='btn btn-primary' onClick={()=>{cancelbooking(booking._id ,booking.roomid )}}>CANCEL BOOKING</button>
                          </div>
                        )}
                    </div>
                }))}
            </div>
        </div>
    </div>
  )
}

export function MyProfile() {
    const user = JSON.parse(localStorage.getItem("currentuser"))
    console.log(user)
    return (
      <div className="col-md-6">
          <br />
          <h1><b>My Profile</b></h1>
          <br />
          <div className='bs'>
            <h3>Name : {user.name}</h3>
            <h3>Email : {user.email}</h3>
            <h3>isAdmin : {user.isadmin ? "YES" : "NO"}</h3>
          </div>
      </div>
    )
  }
