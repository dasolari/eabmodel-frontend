import { makeStyles } from '@material-ui/core/styles';

export const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  title: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});
