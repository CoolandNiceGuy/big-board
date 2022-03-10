import React, { useDebugValue } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, CardHeader, Typography } from '@mui/material';
import { TextField, List, ListItem, ListItemText, Checkbox, Button, Divider } from '@mui/material';
import { StatTarget } from './StatTarget';
import Box from '@mui/material/Box';
import { DICTIONARY } from './Utils/dictionary';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import { CardContents } from './CardContents';


const formatOptions = (arr) => {
  let output = arr.map((element, index) => (
    {
    'label' : element,
    'optionCategory' : (element.indexOf(" Vs. ") !== -1)? 'Game': 'Player',
    'id': index
    }
  ))

  output.sort((a, b) => a.optionCategory.localeCompare(b.optionCategory))
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

  //hook saying if selected option is a game
  const [isGame, setIsGame] = React.useState(false);

  const [game, setGame] = React.useState({});

  const [over_under, setOver_under] = React.useState(-1);

  const [overUnderToggle, setOverUnderToggle] = React.useState('');


  const handleOUToggle = (event, newSelection) => {
    setOverUnderToggle(newSelection);
  }

  const didOUHit = () => {
    if(overUnderToggle === "over"){
      let scoreOne = game[0].score
      let scoreTwo = game[1].score
      let sum = (parseInt(scoreOne) + parseInt(scoreTwo));
      let isOver = (sum > over_under) && (over_under !== -1);
      return isOver;
    } else if(overUnderToggle === "under"){
      let scoreOne = game[0].score
      let scoreTwo = game[1].score
      let sum = (parseInt(scoreOne) + parseInt(scoreTwo))
      let isUnder = (sum < over_under) && (over_under !== -1);
      return isUnder
    }
      
  }

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

  const targetGenerator = (item, i) => {
    return (
    <Box sx={{minHeight:'30%'}}>
      <StatTarget 
      title={DICTIONARY[item]} 
      value={selectedStats[item]}
      sx={{display: 'flex', flex: '1'}} 
      target={trackedStats[item]}/> 
      { i!== (Object.keys(trackedStats).length - 1) &&
        <Divider sx={{marginTop: '2.5%', marginBottom: '2.5%'}}></Divider>
      }
    </Box>)
  }

    return (
        <Card sx={{ display: 'flex' , flexDirection: 'column'}}>
          { !isGame &&
          <Card sx={{borderRadius: '0px'}}>
            <CardHeader
            action={
              <CardActions>
              {props.children}   
              </CardActions>
              }
            title={<Typography variant="h4">{cardTitle}</Typography>}
          />
          </Card>
          }
          {
            isGame &&
            (cardTitle.length > 0 && isGame && !didOUHit()) &&
            <Card sx={{borderRadius: '0px'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Box>
                <img src={game[0].imageLink} alt={game[0].name} className='team_mascot'></img>
                <Typography variant="h2">{game[0].score}</Typography>
                <Typography>{game[0].name}</Typography>
              </Box>
              <Box>
                <img src={game[1].imageLink} alt={game[1].name} className='team_mascot'></img>
                <Typography variant="h2">{game[1].score}</Typography>
                <Typography>{game[1].name}</Typography>
              </Box>
              {props.children}
              </Box>
            </Card>
          }
          {
            (cardTitle.length > 0 && isGame && didOUHit()) &&
          <Card sx={{borderRadius: '0px'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', background: '#03c774'}}>
            <Box>
              <img src={game[0].imageLink} alt={game[0].name} className='team_mascot'></img>
              <Typography variant="h2">{game[0].score}</Typography>
              <Typography>{game[0].name}</Typography>
            </Box>
            <Box>
              <img src={game[1].imageLink} alt={game[1].name} className='team_mascot'></img>
              <Typography variant="h2">{game[1].score}</Typography>
              <Typography>{game[1].name}</Typography>
            </Box>
            {props.children}
            </Box>
          </Card>
          }

        <CardContent sx={{backgroundColor: '#f5f5f5'}}>
          {/* only render autocomplete if player unselected */}
          {cardTitle.length === 0 &&
            <Autocomplete
            options = {formatOptions(props.options)}
            renderInput={(params) => <TextField {...params} label="Players" />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.optionCategory}
            onChange={(event, newValue) => {
              let temp = props.playerStats[newValue.label];
              delete temp.name;
              if(!temp.isGame){
                setSelectedStats(temp)
              } else {
                setIsGame(true);
                setGame(temp);
              }
              
              setCardTitle(newValue.label);
            }}
          />}
          {/* render stat options only if player is selected */}
          {
            (cardTitle.length > 0 && !areStatsSelected) &&
            <Box>
              <List dense={true}>
                {/* pass in fields to CardContents component */}
                {Object.keys(selectedStats).map((item, i) => {
                  return(
                    <CardContents
                      item={item}
                      checked={checked}
                      listAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(item)}
                          checked={checked.indexOf(item) !== -1}
                          inputProps={{ 'aria-labelledby': item }}
                        />
                      }
                      input={
                        <TextField variant="outlined" type="number" helperText="Enter Stat Target" size="small" disabled = {checked.indexOf(item) === -1} onChange={
                          (e) => {
                            onTextChange(e, item)
                          }
                        }
                        ></TextField>
                      }
                    />
                  )
                })}
              </List>
              {/* Button only valid when at least 1 stat is selected to track */}
              {
                !isGame &&
                <Button variant="contained" onClick={() => {setAreStatsSelected(true)}} disabled={enabled}>Track Selected Stats</Button>
              }
              
            </Box>
          }
          {
            (cardTitle.length > 0 && isGame) &&
              <Box>
                <TextField variant="outlined" type="number" size="small" label="Over/Under" onChange={(e) => setOver_under(e.target.value)}/>
                { 
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
                  <ToggleButtonGroup exclusive value={overUnderToggle} onChange={handleOUToggle}>
                    <ToggleButton value="under" disabled={over_under === -1}>Under</ToggleButton>
                    <ToggleButton value="over" disabled={over_under === -1}>Over</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                
                }
              </Box>
          }
          {
            areStatsSelected && 
            <Box sx={{ minWidth: 35, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              {Object.keys(trackedStats).map((item, i) => {return targetGenerator(item, i)})}
            </Box>
          }
        </CardContent>
      </Card>
    )
}

export { PlayerCard };