import {
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, FormControl, Paper } from '@material-ui/core';
import useSearchValue from '../hooks/use-search-value';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectControl: {
      '& > *': {
        width: 'auto',
        transform: 'translateY(2px)',
        fontSize: '1.5rem',
        textTransform: 'capitalize',
        color: theme.palette.primary.main,
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
      color: theme.palette.primary.main,
    },
    modalStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: theme.palette.secondary.light,
      border: '2px solid #000',
      boxShadow: '24',
      p: 4,
    },
  })
);

export default function AdvancedSearchModal() {
  const classes = useStyles();
  const { filter, onFilterChange, onSubmitHandler } = useSearchValue();
  const searchOptions = ['post', 'author'];

  return (
    <div className={classes.modalStyle}>
      <FormControl fullWidth>
        <TextField
          id="standard-select-search-type"
          select
          value={filter}
          InputProps={{ disableUnderline: true }}
          className={classes.selectControl}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option} value={option} className={classes.selectItem}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </div>
  );
}
