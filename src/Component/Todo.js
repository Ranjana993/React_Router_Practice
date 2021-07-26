import React, { useState, useEffect } from 'react'
import "./Style.css"


// Get the data local data
const getLocaData = () => {
    const list = localStorage.getItem("myTodoList")
    if (list) {
        return JSON.parse(list);

    }
    else {
        return [];
    }
}

function Todo() {
    const [inputData, setinputData] = useState("");
    const [item, setItem] = useState(getLocaData())
    const [isEditItem, setEditeItem] = useState();
    const [toggleBtn, setToggleBtn] = useState(false)

    // Adding the item 
    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data")
        } else if (inputData && toggleBtn) {
            setItem(
                item.map((currEle) => {
                    if (currEle.id === isEditItem) {
                        return { ...currEle, name: inputData }
                    }
                    return currEle;
                })
            )
            setinputData([])
            setEditeItem(null)
            setToggleBtn(false)

        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItem([...item, myNewInputData]);
            setinputData("")
        }
    }
    // Deleting the item
    const deleteItem = (index) => {
        const upDatedItem = item.filter((currEle,) => {
            return currEle.id !== index;
        })
        setItem(upDatedItem)
    }


    // removing the item 
    const removeAll = () => {
        setItem([]);
    }
    // Adding local storage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(item))
    }, [item])

    // edit the item 
    const editItem = (index) => {
        const item_todo_edited = item.find((currEle) => {
            return currEle.id === index;
        })
        setinputData(item_todo_edited.name)
        setEditeItem(index)
        setToggleBtn(true)
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./Image/Todo.jpg" alt="bjvsd" />
                        <figcaption>✌ Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder=" 🐱‍👓Add item "
                            className="form-control"
                            value={inputData}
                            onChange={(e) => setinputData(e.target.value)} />

                        {
                            toggleBtn ? <i className="far fa-edit add-btn" onClick={addItem}></i> :
                                <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        }


                    </div><br />
                    {/* Show item */}
                    <div className="showItem">
                        {
                            item.map((currElement) => {
                                return (
                                    <div className="eachItem" key={currElement.id}>
                                        <h3>{currElement.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(currElement.id)}></i>
                                            <i className="fa fa-trash add-btn" onClick={() => deleteItem(currElement.id)}></i>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    {/* Remove the item */}
                    <div className="showItem">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>
                                CHECK LIST
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
