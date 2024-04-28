import React ,{useState , useEffect} from 'react'
import axios from "axios"
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState();
  
  async function loginhandler(){
    
        const user = {
            email,password
        }
        try {
            setLoading(true)
            const result = await  axios.post("https://yellow-journalist-zytev.pwskills.app:8080/api/users/login",user);
            console.log(result.data);
            setLoading(false);
            localStorage.setItem("currentuser",JSON.stringify(result.data));
            navigate("/home");
            window.location.reload(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
       
    
  }
  return (
    <div>
            <h1>
                {loading && (<Loading />)}
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5 mt-5">
                    {error && (<Error message="Invalid Credentials" />)}
                        <div className='bs'>
                            <h2>Login</h2>
                            <input type="text" className='from-control' placeholder='Email'
                            value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <input type="text" className='from-control' placeholder='Password'
                            value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <button className='btn btn-primary mt-3' onClick={loginhandler}>Login</button>
                        </div>
                    </div>
                </div>
            
            </h1>

    </div>
  )
}

export default Login