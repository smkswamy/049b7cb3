import React, { useState, useEffect } from 'react';
import { fetchActivities, archiveCall } from '../services/api';
import { List, Typography, Button, Fade, makeStyles } from '@material-ui/core';
import CallItem from './CallItem.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  dateHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    fontSize: '0.875rem',
  },
}));

const groupActivitiesByDateAndNumber = (activities) => {
  return activities.reduce((groups, activity) => {
    const date = new Date(activity.created_at).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = {};
    }
    if (!groups[date][activity.from]) {
      groups[date][activity.from] = [];
    }
    groups[date][activity.from].push(activity);
    return groups;
  }, {});
};

const ActivityFeed = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const data = await fetchActivities();
      setActivities(data.filter(activity => !activity.is_archived));
    };
    getActivities();
  }, []);

  const handleArchive = async (activities) => {
    await Promise.all(activities.map(activity => archiveCall(activity.id)));
    const data = await fetchActivities();
    setActivities(data.filter(activity => !activity.is_archived));
  };

  const groupedActivities = groupActivitiesByDateAndNumber(activities);

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => handleArchive(activities)}
      >
        Archive all calls
      </Button>
      {Object.keys(groupedActivities).map(date => (
        <div key={date}>
          <Typography variant="h6" className={classes.dateHeader}>
            {date}
          </Typography>
          <List>
            {Object.keys(groupedActivities[date]).map(from => (
              <Fade in key={from}>
                <CallItem
                  activities={groupedActivities[date][from]}
                  handleArchive={handleArchive}
                  callCount={groupedActivities[date][from].length}
                />
              </Fade>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;