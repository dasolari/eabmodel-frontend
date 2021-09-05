import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'right',
    marginLeft: '2rem',
    marginRight: '2rem',
    fontSize: '1rem',
  },
  btn: {
    fontSize: '1rem',
  },
}));
