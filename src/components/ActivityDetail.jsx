import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, makeStyles } from '@material-ui/core';
import { fetchActivityDetail } from '../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  detailItem: {
    marginBottom: theme.spacing(1),
  },
  backButton: {
    marginBottom: theme.spacing(2),
  },
}));

const ActivityDetail = ({ match, history }) => {
  const classes = useStyles();
  const { id } = match.params;
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const getActivity = async () => {
      const data = await fetchActivityDetail(id);
      setActivity(data);
    };
    getActivity();
  }, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.backButton}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
      <Typography variant="h5" className={classes.detailItem}>
        Call Details
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        From: {activity.from}
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        To: {activity.to}
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        Direction: {activity.direction}
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        Duration: {activity.duration} seconds
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        Via: {activity.via}
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        Call Type: {activity.call_type}
      </Typography>
      <Typography variant="body1" className={classes.detailItem}>
        Created At: {new Date(activity.created_at).toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default ActivityDetail;