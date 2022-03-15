import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, FormControl, Paper, IconButton, Box, Button } from '@material-ui/core';

import { useState } from 'react';
import PostSearchInput from './SearchInput/PostSearchInput';
import useSearchValue from '../hooks/use-search-value';
import AdvancedSearch from './AdvancedSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'visible',
      maxWidth: '785px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(2, 2, 0, 2),
      marginBottom: theme.spacing(6),
    },
    card: {
      padding: theme.spacing(0, 0, 0, 2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '50px',
      background: 'rgba(160,209,250, 0.4)',
      border: 'solid 2px #121D59',
      transition: 'background-color .5s',
      '&:hover': {
        border: 'solid 2px #121D59',
      },
      [theme.breakpoints.down('xs')]: {
        borderRadius: '15px',
        padding: theme.spacing(0, 0, 0, 2),
      },
    },
    header: {
      padding: 0,
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    h1: {
      display: 'block',
      transition: 'all linear 350ms',
      fontWeight: 600,
      color: theme.palette.text.secondary,
      [theme.breakpoints.between('xs', 'sm')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: '4rem',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '5rem',
      },
    },
    iconButton: {
      backgroundColor: '#121D59',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
      '& * > .MuiSvgIcon-root': {
        fontSize: '2rem',
        color: theme.palette.primary.contrastText,
      },
      margin: 0,
      position: 'absolute',
      right: '10px',
      top: '10px',
      padding: '8px',
      color: '#A0D1FA',
    },
    selectControl: {
      '& > *': {
        width: 'auto',
        transform: 'translateY(2px)',
        fontSize: '1.5rem',
        textTransform: 'capitalize',
        paddingLeft: '2rem',
        [theme.breakpoints.down('xs')]: {
          paddingLeft: '1rem',
          width: '10rem',
          transform: 'translateY(15px)',
        },
      },
    },
    selectItem: {
      fontSize: '1.4rem',
      textTransform: 'capitalize',
    },
    advanceSearchButton: {
      position: 'relative',
      left: '65rem',
      width: 'auto',
      padding: '5px 10px',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      color: '#000000',
      fontSize: '10px',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

const SearchBar = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const { onSubmitHandler } = useSearchValue();

  return (
    <Box className={classes.root}>
      <Paper component="form" className={classes.card} elevation={0}>
        <Grid container direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
          <FormControl fullWidth>
            <PostSearchInput />
            <IconButton
              className={classes.iconButton}
              type="submit"
              onClick={onSubmitHandler}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </FormControl>
        </Grid>
      </Paper>
      <Button
        className={classes.advanceSearchButton}
        onClick={() => {
          setOpenDialog(!openDialog);
        }}
      >
        Advanced Search
      </Button>
      <AdvancedSearch openDialog={openDialog} />
    </Box>
  );
};

export default SearchBar;
