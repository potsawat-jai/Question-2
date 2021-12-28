import './App.css';
import React, { useState, useEffect } from "react";
import { Label, Input } from "reactstrap";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
      fetch("https://api.publicapis.org/categories")
          .then((res) => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setItems(result);
                  console.log(result)
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          );
  }, []);

  if (error) {
      return <>{error.message}</>;
  } else if (!isLoaded) {
      return <>loading...</>;
  } else {
      return (
          /* here we map over the element and display each item as a card  */
          <div className="container">
              <Label>Search Table: </Label>
              <Input
                value={filtered || ""}
                onChange={(e) => {
                  setFiltered(e.target.value);
                }}
                placeholder=" Enter value "
                className="w-25"
                style={{
                  fontSize: "1.1rem",
                  margin: "15px",
                  display: "inline",
                }}
              />
             <table>
                <thead>
                  <tr>
                    <th>Catageories</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    items.filter(catageory => catageory.includes(filtered)).map(filterCatageory => (
                      <tr>
                      <td>{filterCatageory}</td>
                    </tr> 
                    ))
                  }
                </tbody>
              </table>
          </div>
      );
  }
}

export default App;
