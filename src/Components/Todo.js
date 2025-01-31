import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './todo.css'

function Todo() {
    const [todoList, setTodoList] = useState([])
    const [todoInput, setTodoInput] = useState('')

    useEffect(() => {
        getTodosFromAPI()
    }, [])

    const deleteTodo = (i) => {
        console.log(i)
        // Pass todo to the delete API here
        let del_todolist_item = todoList
        del_todolist_item.splice(i,1)
        setTodoList([...del_todolist_item])
        // Call getTodosFromAPI again to load latest change
    }

    const checkTodoAsCompleted = (todo) => {
        // Got to API and edit the todo
        if(todo.completed){
            todo.completed = false
        }
        else{todo.completed = true}
        setTodoList([...todoList])
        // call setTodoList in order to load changes
    }


    const addTodoToAPI = () => {
        if(todoInput.length <= 0){
            alert('please enter todo')
        }
        else{
            console.log(todoInput)
            let updatedTodo = [...todoList]
            updatedTodo.push({
                id: '343493',
                todoItem: todoInput,
                completed: false
            })
            setTodoList(updatedTodo)
            setTodoInput('')
        }
    }

    const getTodosFromAPI = async () => {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
            console.log(data);

            let newTodoDataStructure = data.map(element => {         
                return {  
                    id: element.id,
                    todoItem: element.title,
                    completed: element.completed
                }
            })
            newTodoDataStructure.length = 4
            setTodoList(newTodoDataStructure)

          } catch (error) {
            console.error(error);
          }
    }
    let todo_key = 0


    if (todoList.length > 0) return (
        <div className="wrapper">
            <div className="top__section">
                <div>
                    <input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="input__text" type="text" placeholder="What needs to be done?" />
                </div>
                <div>
                    <button onClick={() => addTodoToAPI()} className="add__btn">+ Add</button>
                </div>
            </div>


            <div className="bottom__section">
                <div className="todo__title"><h2>Todo List</h2></div>
                {
                    todoList.map((todo, i) => (
                        <div key={i} className="todo__list__items">
                            <div className="row__item">
                                <div className="side__item">
                                    <input type="checkbox" onChange={() => checkTodoAsCompleted(todo)} checked={todo.completed}/>
                                    { todo.completed ? 
                                        <p className="todo__text"><del>{todo.todoItem}</del></p> 
                                        : 
                                        <p className="todo__text">{todo.todoItem}</p>
                                    }   
                                </div>
                                <button onClick={() => deleteTodo(i)} className="delete__btn">X</button>
                                
                            </div>
                        </div>
                    ))
                }
            
            </div>
        </div>
    )

    return (
        <div className="loading__container">
            <h1 >Loading...</h1>
        </div>
    )
}

export default Todo
