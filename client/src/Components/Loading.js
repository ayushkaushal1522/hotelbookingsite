import React ,{useState}from 'react'
import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
//   const override = `
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   `;
  return (
    <div>
         <div className="sweet-loading" style={{textAlign:'center'}}>
            <HashLoader
                color="#000"
                loading={loading}
                // cssOverride={override}
                size={80}
                css=""
            />
        </div>
    </div>
   
  )
}

export default Loading