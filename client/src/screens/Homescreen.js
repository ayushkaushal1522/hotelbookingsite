import React , {useState,useEffect} from 'react'
import axios from 'axios'
import Room from '../Components/Room';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const Homescreen = () => {
    const [rooms,setRooms] = useState([]);
    const [loading,setLoading] = useState();
    const [error,setError] = useState();

    useEffect(() => {
      
        let getallrooms = async()=>{
            try{
                setLoading(true);
                const data = (await axios.get("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/getallrooms")).data;
        
                setRooms(data);
                setLoading(false);
            }
            catch(err){
                setError(true);
                console.log(err);
                setLoading(false);
            }
        }
        getallrooms();
    
     
      
    }, [])
    
  return (
    <div className='container'>
        <div className="row justify-content-center mt-5">
            {loading ? (<h1><Loading /></h1>): rooms ? (
                rooms.map(room=>{
                    return <div className="col-md-9 mt-2">
                        <Room room={room}/>
                    </div>
                })
            ):(
                <Error />
            )}
        </div>
    </div>
  )
}

export default Homescreen