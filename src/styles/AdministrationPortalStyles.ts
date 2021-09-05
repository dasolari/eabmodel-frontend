import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainContainer: {
    margin: '30px auto',
    height: '70vh',
    width: '70vw',
  },
  section: {
    position: 'relative',
    textAlign: 'left',
    margin: '15px 5px',
    padding: 5,
  },
  buttonContainer: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});

export default useStyles;
