import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


// We have imported axios to fetch the data from our local JSON server
function App() {
const[data, setData]= useState([]);
  useEffect(() => {
    loadUsersData();
  }, []);
// below we have fetched the data from the url , we have setup the server on local machine
  const loadUsersData = async () => {
    return await axios
       .get("http://localhost:5000/users")
       .then((response) => 
       setData(response.data))
       .catch((err) => console.log(err));
  };
  
  console.log(data);

  // the value of the search field 
  const [name, setName] = useState('');

  // the search result
  const [foundUsers, setFoundUsers] = useState(data);

  useEffect(() => {
    setFoundUsers(data);
  }, [data]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = data.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(data);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };
  return (
    <div className="container">
    <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />

      <div className="user-list">
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((user) => (
            <li key={user.id} className="user">
              <span className="user-id">{user.id}</span>
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email} </span>
              <span className="user-address">{user.address} </span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export default App;