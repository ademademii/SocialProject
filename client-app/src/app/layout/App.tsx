import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selcetedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5000/api/activities')
    .then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  //Handle Open Form
  function handleFormOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  //Handle Close Form
  function handleCloseForm(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity,id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x=>x.id !== id)])
  }

  return (
    <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop:'7em'}}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity={selcetedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectAcitvity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          />
        </Container>
        
    </>
  );
}

export default App;
