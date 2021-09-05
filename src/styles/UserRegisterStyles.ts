import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      width: '80%',
      margin: '8vh auto auto',
    },
    heading: {
      fontSize: '1.1rem',
      flexBasis: '33.33%',
      flexShrink: 0,
      textAlign: 'left',
    },
    secondaryHeading: {
      fontSize: '0.95rem',
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      textAlign: 'left',
    },
    fab: {
      margin: theme.spacing(2),
    },
    alertMessage: {
      textAlign: 'left',
      color: 'red',
      padding: 0,
      margin: 0,
    },
  }),
);

export default useStyles;
