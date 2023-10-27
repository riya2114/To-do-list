import React, { useState } from 'react';
import styles from './TodoList.module.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
    const [click, setClick] = useState(false);
    const [todo, setToDo] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [complete, setComplete] = useState([]);

    const handleButton=() => {
        let newTodo={
            title: newTitle,
            description: newDescription
        }
        let updatedTodo=[...todo, newTodo];
        setToDo(updatedTodo);
        setNewTitle("");
        setNewDescription("");
    }
    const deleteButton=(index)=>{
        let deleteTodo=[...todo]
        deleteTodo.splice(index, 1);
        setToDo(deleteTodo);
    }
    const completeButton=(index)=>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth()+1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completeDate = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;
        let filterData={
            ...todo[index],
            completeDate: completeDate
        }
        let updateComplete =[...complete,  filterData]
        deleteButton(index);
        setComplete(updateComplete);
    };
    const deleteCompleteButton=(index)=>{
        let completeTodo = [...complete]
        completeTodo.splice(index, 1)
        setComplete(completeTodo);
    }
  return (
    <>
        <div className={styles.heading}>To Do List</div>
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={styles.title}>
                    <h5>Title:</h5>
                    <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}
                     placeholder="What's the title of your to do?"/>
                </div>
                <div className={styles.title}>
                    <h5>Description:</h5>
                    <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}
                    placeholder="What's the description of your to do?"/>
                </div>
                <div className={styles.add_button}>
                    <button onClick={handleButton} disabled={!newTitle.trim() || !newDescription.trim()}>Add</button>
                </div>
            </div>
            <div className={styles.button}>
                <button className={`todo ${click===false ? 'active':''}`} onClick={()=>setClick(false)}>ToDo</button>
                <button className={`todo ${click===true ? 'active':''}`} onClick={()=>setClick(true)}>Completed</button>
            </div>
            <div className={styles.list_item}>
              {click===false && todo.map((item, index)=>{
                return(
                    <div className={styles.item} key={index}>
                        <div className={styles.text_item}>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                        </div>
                        <div className={styles.item_icons}>
                           <DeleteOutlineIcon className={styles.icon} onClick={()=>deleteButton(index)} title="delete"/>
                           <CheckIcon className={styles.check} onClick={()=>completeButton(index)} title="complete"/>
                        </div>
                    </div>
                )
              })}
              {click===true && complete.map((item, index)=>{
                return(
                    <div className={styles.item} key={index}>
                        <div className={styles.text_item}>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                           <p><small>Completed On: {item.completeDate}</small></p>
                        </div>
                        <div className={styles.item_icons}>
                           <DeleteOutlineIcon className={styles.icon} onClick={()=>deleteCompleteButton(index)} title="delete"/>
                        </div>
                    </div>
                )
              })}
            </div>
        </div>

    </>
  )
}

export default TodoList;