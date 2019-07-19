import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../uilitiy/axiosWithAuth";

import Ingredients from "./Ingredients";

export default function Restricted(props) {
  const [restricted, setRestricted] = useState([{}]);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/api/restricted/data")
      .then(res => {
        setRestricted(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);
  return (
    <div className="restrictedContact">
      <button onClick={logOutHandler}>Log Out</button>
      {restricted.map(item => {
        return (
          <div key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.course}</p>
            <p>{item.technique}</p>
            <Ingredients ingredients={item.ingredients} />
          </div>
        );
      })}
    </div>
  );
}
