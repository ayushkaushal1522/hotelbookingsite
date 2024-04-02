import React , {useState,useEffect} from 'react'
import axios from 'axios'
import Room from '../Components/Room';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import Error from '../Components/Error';


const Bookingscreen = () => {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const [room,setRoom] =useState();
    const params = useParams();
    useEffect(() => {
        try {
            let getroomdetails = async()=>{
                try{
                    setLoading(true);
                    const data = await axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/getroombyid" , {roomid:params.roomid});
                    
                    setRoom(data.data);
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
    }, [])
   ;
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
                        <p>Name:</p>
                        <p>From Date :</p>
                        <p>To Date :</p>
                        <p>Max Count : {room.maxcount}</p>
                    </b>
                </div>
                <div style={{textAlign:'right'}}>
                    <b>
                        <h1>Amount</h1>
                        <hr />
                        <p>Total Days:</p>
                        <p>Rent Per Day :{room.rentperday}</p>
                        <p>Total Amount</p>
                    </b>
                    
                </div>

    

                <div style={{float:'right'}}>
                    <button className='btn btn-primary'>Pay Now</button>
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