import React , {useState,useEffect} from 'react'
import axios from 'axios'
import Room from '../Components/Room';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import moment from 'moment';

const Bookingscreen = () => {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const [room,setRoom] =useState();
    const [totaldays ,setTotaldays] = useState();
    const [totalamount , setTotalamount] = useState();
    const params = useParams();
    
    
    
    useEffect(() => {

        if(!localStorage.getItem("currentuser")){
            window.location.reload("/login")
        }
        try {
            let getroomdetails = async()=>{
                try{
                    setLoading(true);
                    const data = await axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/getroombyid" , {roomid:params.roomid});
                    const fromdate = moment(params.fromdate , 'DD-MM-YYYY');
                    const todate = moment(params.todate , 'DD-MM-YYYY');
                    const diff = moment.duration(todate.diff(fromdate)).asDays()+1;
                    setTotaldays(moment.duration(todate.diff(fromdate)).asDays()+1);
                    setRoom(data.data);
                    setTotalamount(diff*(data.data.rentperday));
                    setLoading(false);
                }
                catch(err){
                    setError(true);
                    console.log(err);
                    setLoading(false);
                }
            }
            getroomdetails();
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function bookroom(){
        const bookingdetails = {
            room,
            userid:JSON.parse(localStorage.getItem('currentuser'))._id,
            fromdate:params.fromdate,
            todate:params.todate,
            totalamount,
            totaldays,


        }
        try {
            const result = await axios.post( "https://yellow-journalist-zytev.pwskills.app:8080/api/bookings/bookroom", bookingdetails)
        } catch (error) {
            
        }
    }

   
  return (
   <div>
      {loading ? (<h1><Loading /></h1>): room ? (
        <div className='m-5'>
        <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} className='myimg' />
            </div>
            <div className="col-md-6">
                <div  style={{textAlign:'right'}}>
                    <h1>Booking Details</h1>
                    <hr />
                    <b>
                        <p>Name: {JSON.parse(localStorage.getItem("currentuser")).name}</p>
                        <p>From Date :{params.fromdate}</p>
                        <p>To Date : {params.todate}</p>
                        <p>Max Count : {room.maxcount}</p>
                    </b>
                </div>
                <div style={{textAlign:'right'}}>
                    <b>
                        <h1>Amount</h1>
                        <hr />
                        <p>Total Days: {totaldays}</p>
                        <p>Rent Per Day :{room.rentperday}</p>
                        <p>Total Amount  : {totalamount}</p>
                    </b>
                    
                </div>

    

                <div style={{float:'right'}}>
                    <button className='btn btn-primary' onClick={bookroom}>Pay Now</button>
                </div>
                
            </div>
        </div>
    </div>
      ) :(
        <Error />
      )}
   </div>
  )
}

export default Bookingscreen