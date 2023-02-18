import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [footName, setFoodName] = useState("");
  const [eatingDays, setEatingDays] = useState(0);
  const [footList, setFoodList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: footName,
      eatingDays: eatingDays,
    });
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
            <div key={key}>
              <h1>{val.foodName}</h1> <h1>{val.eatingDays}</h1>{" "}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default App;
