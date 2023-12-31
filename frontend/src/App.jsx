import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [footName, setFoodName] = useState("");
  const [eatingDays, setEatingDays] = useState(0);
  const [footList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    setFoodList([
      ...footList,
      { foodName: footName, eatingDays: eatingDays },
    ]);

    axios.post("http://localhost:3001/insert", {
      foodName: footName,
      eatingDays: eatingDays,
    });
  };

  const editFoodName = (id) => {
    setFoodList(
      footList.map((val) => {
        return val._id === id
          ? {
            _id: id,
            eatingDays: val.eatingDays,
            foodName: newFoodName,
          }
          : val;
      })
    );

    axios.put("http://localhost:3001/editFoodName", {
      id: id,
      footName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    setFoodList(
      footList.filter((val) => {
        return val._id !== id;
      })
    );

    axios.delete(`http://localhost:3001/deleteFood/${id}`);
  };

  return (
    <Fragment>
      <div className="App">
        <h1>CRUD App with MERN</h1>

        <label htmlFor="foodName">Food Name</label>
        <input
          type="text"
          name="footName"
          id="foodName"
          onChange={(event) => {
            setFoodName(event.target.value);
          }}
        />

        <label htmlFor="eatingDays">Eating Days</label>
        <input
          type="number"
          name="eatingDays"
          id="eatingDays"
          onChange={(event) => {
            setEatingDays(event.target.value);
          }}
        />

        <input type="button" value="Add To List" onClick={addToList} />

        <h1>Food List</h1>

        {footList.map((val, key) => {
          return (
            <div key={key} className="food">
              <h1>{val.foodName}</h1> <h1>{val.eatingDays}</h1>{" "}
              <input
                type="text"
                placeholder="edit food name..."
                name="newfood"
                onChange={(event) => {
                  setNewFoodName(event.target.value);
                }}
              />
              <input
                type="button"
                value="Edit"
                id="edit"
                onClick={() => editFoodName(val._id)}
              />
              <input
                type="button"
                value="delete"
                id="delete"
                onClick={() => {
                  deleteFood(val._id);
                }}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default App;
