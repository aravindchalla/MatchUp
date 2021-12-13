import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@material-ui/core/styles';
import {
  Toolbar,
  OutlinedInput,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import React from 'react';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  
  const accountdetails = React.useState(JSON.parse(localStorage.getItem('accountDetails')) || undefined);
  
  console.log(accountdetails[0]);
  const { name,id,balance } = accountdetails[0];
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      <TableContainer sx={{ minWidth: 800 }}>
              <Table>
          
                <TableBody>
                    <TableRow
                      hover
                    >
                      <TableCell align="left">Bank Name : {name}</TableCell>
                      <TableCell align="left">Bank ID : {id}</TableCell>
                      <TableCell align="left">Bank Ballance : {balance}</TableCell>
                    </TableRow>
                      
                </TableBody>
         
              </Table>
            </TableContainer>
  
    </RootStyle>
  );
}
