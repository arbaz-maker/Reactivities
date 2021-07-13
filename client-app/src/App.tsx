import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setactivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then((response) => {
        console.log(response.data);
        setactivities(response.data);
      })
      .catch((e) => {
        console.log(e);
      })

  }, [])



  return (
    <div >
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((activity: any) => (
          <li key={activity.id}>
            {activity.title}
          </li>
        ))}
      </List>
    </div>
  );
}

export default App;
