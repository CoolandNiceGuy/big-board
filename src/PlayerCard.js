import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, CardHeader } from '@mui/material';
import { TextField, List, ListItem, ListItemText, Checkbox, Button, Divider } from '@mui/material';
import { StatTarget } from './StatTarget';
import Box from '@mui/material/Box';
import { DICTIONARY } from './Utils/dictionary';
import { v4 as uuidv4 } from 'uuid';


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
  //hook used for rendering selected players name on top of card
  const [cardTitle, setCardTitle] = React.useState("");

  //hook used to store *all* stats of selected player
  const [selectedStats, setSelectedStats] = React.useState({});

  const [trackedStats, setTrackedStats] = React.useState({});

  //hook used to track which stats are selected for tracking
  const [checked, setChecked] = React.useState([]);

  //hook used to conditionally render stat options list
  const [areStatsSelected, setAreStatsSelected] = React.useState(false);

  //hook boolean used to track whether or not "track" button is enabled
  const [enabled, setEnabled] = React.useState(true);

  //keeps track of selected stats to track
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    //toggle button enabled state
    let bool = ((newChecked.length === 0) || (Object.keys(trackedStats).length === 0))
    setEnabled(bool)
    
    setChecked([...newChecked]);
  };

  const onTextChange = (e, statLabel) => {
    let n = trackedStats;
    n[statLabel] = e.target.value;

    //edge case: deleting entry from text box
    if(e.target.value === ''){
      delete n[statLabel]
    }

    //toggle button enabled state
    let bool = ((checked.length === 0) || (Object.keys(n).length === 0))
    setEnabled(bool)

    setTrackedStats(n);
  }

    return (
        <Card sx={{ minWidth: 275, display: 'flex' , flexDirection: 'column'}}>
          <CardHeader
            action={
              <CardActions>
              {props.children}   
              </CardActions>
              }
            title={<u>{cardTitle}</u>}
          />
        <CardContent>
          {/* only render autocomplete if player unselected */}
          {cardTitle.length === 0 &&
            <Autocomplete
            options = {formatOptions(props.options)}
            renderInput={(params) => <TextField {...params} label="Players" />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              let temp = props.playerStats[newValue.label];
              delete temp.name;
              setSelectedStats(temp)
              setCardTitle(newValue.label);
              // console.log(Object.keys(selectedStats))
            }}
          />}
          {/* render stat options only if player is selected */}
          {
            (cardTitle.length > 0 && !areStatsSelected) &&
            <Box>
              <List dense={true}>
                {Object.keys(selectedStats).map((item, i) => {return <Box>
                <ListItem
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(item)}
                    checked={checked.indexOf(item) !== -1}
                    inputProps={{ 'aria-labelledby': item }}
                  />
               }>
              <ListItemText>{DICTIONARY[item]}</ListItemText>
              {
                //only render text field if box is checked
                (checked.indexOf(item) !== -1) &&
              <TextField variant="outlined" type="text" helperText="Enter Stat Target" size="small" disabled = {checked.indexOf(item) === -1} onChange={
                (e) => {
                  onTextChange(e, item)
                }
              }
              ></TextField>
            }
              </ListItem>
              <Divider component="li"/>
              </Box>
            })}
              </List>
              {/* <StatTarget value={}/> */}
              {/* Button only valid when at least 1 stat is selected to track */}
              <Button variant="contained" onClick={() => {setAreStatsSelected(true)}} disabled={enabled}>Track Selected Stats</Button>
            </Box>
          }
          {
            areStatsSelected && 
            <Box sx={{ minWidth: 35, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              {Object.keys(trackedStats).map((item, i) => {return <Box sx={{minHeight:'30%'}}>
              <StatTarget 
              title={DICTIONARY[item]} 
              value={selectedStats[item]}
              sx={{display: 'flex', flex: '1'}} 
              target={trackedStats[item]}/> 
              { i!== (Object.keys(trackedStats).length - 1) &&
                <Divider sx={{marginTop: '2.5%', marginBottom: '2.5%'}}></Divider>
              }
              </Box>
              })}
            </Box>
            }
        </CardContent>
      </Card>
    )
}

export { PlayerCard };