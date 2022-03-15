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
      borderRadius: '7px',
      outline: 'none',
      color: theme.palette.text.primary,
    },
  })
);

const PostSearchInput = () => {
  const classes = useStyles();

  const { post, onPostChange } = useSearchValue();

  return (
    <>
      <input
        className={classes.input}
        placeholder="Start typing to search a post..."
        value={post}
        onChange={(event) => onPostChange(event.target.value)}
      />
    </>
  );
};

export default PostSearchInput;
