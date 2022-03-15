import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useSearchValue from '../../hooks/use-search-value';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      fontSize: '1.6rem',
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
      '& > *': {
        fontSize: '1.6rem !important',
        color: theme.palette.text.primary,
      },
      height: '55px',
      backgroundColor: 'transparent',
      paddingLeft: '10px',
      paddingRight: '60px',
      border: 'none',
      outline: 'none',
      color: theme.palette.text.primary,
    },
  })
);

const AuthorSearchInput = () => {
  const classes = useStyles();
  const { author, onAuthorChange } = useSearchValue();

  return (
    <>
      <input
        className={classes.input}
        placeholder="Bob Smith"
        value={author}
        onChange={(event) => onAuthorChange(event.target.value)}
      />
    </>
  );
};

export default AuthorSearchInput;
