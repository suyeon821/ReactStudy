import React,{useEffect, useState} from 'react';
import TodoItem from './TodoItem';
import style2 from './style2.css';
import style from './style.css';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Detail from './Detail';
import {Link} from "react-router-dom";

const Todo = () => {
    let [state, setRest] = useState("휴식");

    let [Todos, setTodos] = useState([]);
    let [clk, setClk] = useState(false);
    
    const onOff = ()=>{
        setClk(!clk);
    }

    let [form, setForm] = useState({
        title : "",
        body : "",
        finishedAt : ""
    });

    const onChange=(event)=>{
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    const log = (event)=>{
        event.preventDefault();

        console.log(form);
        onOff();
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/todos")
        .then((response)=>{
            console.log(response);
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert("문제발생");
            });
    },[]);

    const rest = ()=>{
        if(state === "휴식")
            setRest("열일");
    
        else setRest("휴식");
    }
    
    const add = (event)=>{//생성
        event.preventDefault();
        
        axios.post("http://localhost:5000/todos", form)
        .then((response)=>{
            setTodos([...Todos, response.data]);
           
        })
        .catch((error) => {
            console.log(error);
            alert("문제발생");
        })
    }
   const onUpdate = (todoitem, form)=>{
       axios.patch("http://localhost:5000/todos/"+todoitem.id, form)
       .then((response)=>{
        Todos = Todos.map((todo) => {
            if (todoitem.id === todo.id) {
                return response.data;
            }

            return todo;
        });
        setTodos(Todos);

       })
       .catch((error)=>{
           alert("문제발생");
       })
   }
   const onDelete = (todoitem)=>{
        axios.delete("http://localhost:5000/todos/"+todoitem.id)
        .then(()=>{
            Todos = Todos.filter((todo)=>{
                if(todo.id === todoitem.id)
                return false;
                else return true;
            })
            setTodos(Todos);

        })

   }

    return (

       <div>
           할일 목록
            <div onClick={rest}>{state}</div>
            <div className="Todo2" onClick={onOff}>할일생성</div>
            <br/>
            <br/>

            {Todos.map((todoitem)=>{
                return(
                 <TodoItem onDelete={onDelete} onUpdate={onUpdate} key = {todoitem.id} todoitem = {todoitem} ></TodoItem>
                 )
            })}

            {clk ?
            <form onSubmit={add}>
            <input name="title" placeholder="할일명" onChange={onChange}></input>
            <br/>
            <input name="body" placeholder="할일 설명" onChange={onChange}></input>
            <br/>
            <input name="finishedAt" placeholder="완료예정일" onChange={onChange}></input>
            <br/>
            
            <button>확인</button> <button onClick={onOff}>취소</button>
            </form>
            : ""
            }
       </div>

   );   
}

export default (Todo);