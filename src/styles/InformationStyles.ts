import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  textContainer: {
    width: '100%',
    margin: '1rem',
  },
  resetContainer: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
  text: {
    textAlign: 'center',
  },
}));
