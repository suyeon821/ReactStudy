import React,{useEffect, useState} from 'react';
import axios from 'axios';
const Detail = ({match}) => {
    
    let [form, setForm] = useState({
        title : "",
        body : "",
        finishedAt : ""
    });

    useEffect(()=>{
        axios.get("http://localhost:5000/todos/1")//test로 1 넣어봄
        .then((response)=>{
            console.log(response);
                setForm(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert("문제발생");
            });
    },[]);

   return (
        <div>test
           {form.title}
           <br/>
           {form.body}
           {form.finishedAt}
           <br/>
        </div>
   );
}
export default Detail;