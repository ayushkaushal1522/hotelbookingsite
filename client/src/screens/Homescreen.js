import React , {useState,useEffect} from 'react'
import axios from 'axios'
import Room from '../Components/Room';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd'
import moment from 'moment'
const { RangePicker } = DatePicker;

const Homescreen = () => {
    const [rooms,setRooms] = useState([]);
    const [loading,setLoading] = useState();
    const [error,setError] = useState();

    const [fromdate ,setFromdate] = useState();
    const [todate,setTodate] = useState();
    const [duplicaterooms , setDuplicaterooms] = useState([]);
    const [searchkey, setSearchkey] = useState("")
    const [type,setType] = useState('all');
    useEffect(() => {
      
        let getallrooms = async()=>{
            try{
                setLoading(true);
                const data = (await axios.get("https://yellow-journalist-zytev.pwskills.app:8080/api/rooms/getallrooms")).data;
        
                setRooms(data);
                setDuplicaterooms(data);
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

    function filterbydate(dates){

        let firstdate = dates[0].date()+'-'+(dates[0].month()+1)+'-'+dates[0].year();
        let seconddate = dates[1].date()+'-'+(dates[1].month()+1)+'-'+dates[1].year();
        setFromdate(firstdate);
        setTodate(seconddate);
        var temprooms = [];
       
        for(const room of duplicaterooms){
            var availability = true;
            if(room.currentbookings.length>0){
                for(let booking of room.currentbookings){
                    if(moment(firstdate).isBetween(booking.fromdate , booking.todate) ||
                    moment(seconddate).isBetween(booking.fromdate , booking.todate) || firstdate==booking.fromdate || firstdate==booking.todate || seconddate==booking.fromdate || seconddate==booking.todate
                    ){
                            availability = false
                        
                    }
                }
            }
            if(availability==true || room.currentbookings.length==0){
                temprooms.push(room);
            }
            setRooms(temprooms);
        }
    }

    function filterbysearch(){
        const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms)
    }

    function filterbytype(e){
        setType(e);
        if(e!=='all'){
            const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
            setRooms(temprooms);
        }
        else{
            setRooms(duplicaterooms);
        }
    }
    
  return (
    <div className='container'>

        <div className='row mt-5 bs'> 

           <div className="col-md-4">
           <RangePicker format='DD-MM-YYYY' onChange={filterbydate} />
           </div>
           <div className="col-md-4">
            <input type="text" className='form-control' placeholder="search rooms" value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterbysearch}/>
           </div>

            <div className="col-md-4">
                <select className='form-control' value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
            </div>
           

        </div>

        <div className="row justify-content-center mt-5">
            {loading ? (<h1><Loading /></h1>):  (
                rooms.map(room=>{
                    return <div className="col-md-9 mt-2">
                        <Room room={room} fromdate={fromdate} todate={todate}/>
                    </div>
                })
            )}
        </div>
    </div>
  )
}

export default Homescreen