import React ,{useState , useEffect} from 'react'
import axios from "axios";
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Success from "../Components/Success"
const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCpassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  async function registerhandler(){
    if(password==cpassword){
        const user = {
            name,email,password,cpassword
        }
        try {
            setLoading(true);
            const result = await  axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/users/register",user).data;
            setLoading(false);
            setSuccess(true);

            setName("")
            setEmail("")
            setPassword("")
            setCpassword("")

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }
    else{
        alert("password not matched");
    }
  }
  return (
    <div>
        <h1>
        {loading && (<Loading />)}
        {error && (<Error />)}
        {success && (<Success message="Registration Success" />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type="text" className='from-control' placeholder='Name'  
                        value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <input type="text" className='from-control' placeholder='Email'
                        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="text" className='from-control' placeholder='Password'
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <input type="text" className='from-control' placeholder='Conform Password'
                        value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
                        <button className='btn btn-primary mt-3' onClick={registerhandler}>Register</button>
                    </div>
                </div>
            </div>
        
        </h1>
        

    </div>
  )
}

export default Register