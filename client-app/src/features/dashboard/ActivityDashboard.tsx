import { Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../activities/details/ActivityDetails';
import ActivityForm from '../activities/form/ActivityForm';

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string)=> void;
    cancelSelectAcitvity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectActivity,deleteActivity,selectedActivity,cancelSelectAcitvity
    , editMode, openForm, closeForm, createOrEdit}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities}
             selectActivity={selectActivity}
             deleteActivity={deleteActivity} />
          
            </Grid.Column>
            <Grid.Column  width='6'>
              {selectedActivity && !editMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectAcitvity={cancelSelectAcitvity}
                openForm={openForm}
                />}
                 {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrdEdit={createOrEdit}/>}
            </Grid.Column> 
        </Grid> 
    )
}