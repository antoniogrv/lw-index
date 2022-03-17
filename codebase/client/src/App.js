import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState("asd");

  useEffect(() => {
    console.log("test useEffect");
    fetch("http://localhost:9000/testAPI")
      .then(res => {
        if(res.ok) {
           return res.text();
        }
      })
      .then(data => setApiResponse(data));
  });

  return (
    <div className="App">
      {apiResponse}
    </div>
  );
}

export default App;
