import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    catalogContainer: {
      width: '50wh',
      height: '50vh',
      margin: 'auto',
    },
    cardContainer: {
      margin: '5%',
      boxShadow: '8px 10px 19px 3px rgba(0,0,0,0.31)',
    },
  }),
);

export default useStyles;
