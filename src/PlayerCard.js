import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';


const formatOptions = (arr) => {
  let output = arr.map((element, index) => (
    {
    'label' : element,
    'id': index
    }
  ))

  // console.log(output)
  return output;
}

const PlayerCard = (props) => {
  const [cardTitle, setCardTitle] = React.useState("");

    return (
        <Card sx={{ minWidth: 275 }}>
          <CardActions>
          {props.children}   
          </CardActions>
          <p>{cardTitle}</p>
        <CardContent>
          <Autocomplete
            options = {formatOptions(props.options)}
            renderInput={(params) => <TextField {...params} label="Players" />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              setCardTitle(newValue.label);
            }}
          >
          </Autocomplete>
        </CardContent>
      </Card>
    )
}

export { PlayerCard };