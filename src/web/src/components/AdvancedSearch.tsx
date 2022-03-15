import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import useSearchValue from '../hooks/use-search-value';

interface Props {
  openDialog: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '20px',
    },

    input: {
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: '20px',
      padding: '10px 15px',
      outline: 'none',
      border: 'solid 2px #121D59',
    },
    criteriaText: {
      fontSize: '18px',
      marginTop: '17px',
    },
  })
);

const AdvancedSearch = (props: Props) => {
  const classes = useStyles();
  const { author, onAuthorChange } = useSearchValue();

  const { openDialog } = props;

  return (
    <>
      {openDialog && (
        <div className={classes.root}>
          <FormControl fullWidth>
            {/* Author */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <p className={classes.criteriaText}>Author</p>
              </Grid>
              <Grid item xs={12} sm={10}>
                <input
                  className={classes.input}
                  placeholder="Bob Smith"
                  value={author}
                  onChange={(event) => onAuthorChange(event.target.value)}
                />
              </Grid>
            </Grid>
          </FormControl>
        </div>
      )}
    </>
  );
};
export default AdvancedSearch;
