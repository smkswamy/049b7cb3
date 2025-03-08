import React from 'react';
import { ListItem, Typography, Paper, IconButton, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArchiveIcon from '@material-ui/icons/Archive';
import CallIcon from '@material-ui/icons/Call';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import VoicemailIcon from '@material-ui/icons/Voicemail';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  callIcon: {
    marginRight: theme.spacing(2),
  },
  callTime: {
    marginLeft: 'auto',
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  callCountCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const getCallIcon = (callType) => {
  switch (callType) {
    case 'missed':
      return <CallMissedIcon />;
    case 'voicemail':
      return <VoicemailIcon />;
    default:
      return <CallIcon />;
  }
};

const CallItem = ({ activities, handleArchive, callCount }) => {
  const classes = useStyles();
  const activity = activities[0];

  return (
    <Paper className={classes.paper}>
      <ListItem className={classes.listItem}>
        <div className={classes.callIcon}>
          {getCallIcon(activity.call_type)}
        </div>
        <Typography variant="body1">
          <Link to={`/activity/${activity.id}`} className={classes.link}>
            {activity.from}
          </Link>
        </Typography>
        {callCount > 1 && (
          <div className={classes.callCountCircle}>
            <Typography variant="caption">{callCount}</Typography>
          </div>
        )}
        <Typography variant="body2" color="textSecondary" className={classes.callTime}>
          {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <IconButton
          edge="end"
          aria-label="archive"
          onClick={() => handleArchive(activities)}
          className={classes.iconButton}
        >
          <ArchiveIcon />
        </IconButton>
      </ListItem>
    </Paper>
  );
};

export default CallItem;