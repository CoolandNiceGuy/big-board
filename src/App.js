import logo from './logo.svg';
import './App.css';
import { TextField, Button } from '@mui/material';
import React from 'react';
import { scrape } from '../node_modules/espn-box-score-scraper/app'; 
import Icon from '@mui/material/Icon';
import { PlayerCard } from './PlayerCard';

const App = () =>  {

  const [options, setOptions] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [playerCards, setPlayerCards] = React.useState([]);

  const  urlChange = async (text) => {
    let output = await scrape(text);
    setPlayers(output);
    setOptions(Object.keys(output));
  }

  const addCard = () => {
    setPlayerCards([...playerCards, true]);
  }

  const deleteCard = (index) => {
    setPlayerCards(playerCards.splice(index, 1));
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <header className="App-header">

        {/* only for debugging purposes */}
        <TextField 
        required id="outlined-basic" 
        label="Link to Box Score" 
        variant="outlined" 
        onChange={ (event) => urlChange(event.target.value)}
        />

      <Button variant="outlined" endIcon={<Icon color="primary">add_circle</Icon>} onClick={() => {addCard()}}>
        Add Card
      </Button>

      {playerCards.map((item, index) => (<PlayerCard title={item} options={options} key={index}></PlayerCard> ))}

      </header>
    </div>
  );
}

export default App;
