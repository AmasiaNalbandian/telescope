import { Grid, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import useSearchValue from '../hooks/use-search-value';

interface Props {
  openDialog: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '20px',
    },
    criteriaText: {
      fontSize: '18px',
      marginTop: '17px',
    },
    inputGrid: {
      marginTop: '1rem',
    },
    customInput: {
      borderRadius: `4rem 4rem 4rem 4rem`,
      background: theme.palette.background.default,
      borderColor: theme.palette.info.main,
      borderWidth: `2px`,
      transition: theme.transitions.create(['background-color', 'border-color'], {
        duration: '.5s',
      }),
    },
    customInputText: {
      color: theme.palette.text.primary,
    },
    customInputTextDark: {
      color: theme.palette.text.secondary,
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
            <Grid container spacing={2} className={classes.inputGrid}>
              <TextField
                id="postSearchInput"
                variant="outlined"
                size="small"
                fullWidth
                label="Author"
                onChange={(event) => onAuthorChange(event.target.value)}
                value={author}
                InputProps={{
                  classes: {
                    root: classes.customInput,
                    focused: classes.customInput,
                    notchedOutline: classes.customInput,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.customInputText,
                    focused: classes.customInputTextDark,
                  },
                }}
              />
            </Grid>
          </FormControl>
        </div>
      )}
    </>
  );
};
export default AdvancedSearch;
