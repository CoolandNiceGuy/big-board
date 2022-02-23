import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete } from '@mui/material';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PlayerCard = (props) => {
    console.log(props)
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardActions>
         <IconButton aria-label="delete">
            <DeleteIcon />
         </IconButton>   
        </CardActions>
        <CardContent>
          <Autocomplete
            options = {props.options}
            renderInput={(params) => <TextField {...params} label="Players" />}
          >
          </Autocomplete>
        </CardContent>
      </Card>
    )
}

export { PlayerCard };