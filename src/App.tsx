import React from 'react';
import { Board } from './board/Board';

function App() {
  const selectedBoardSize = 4; //TODO: set dynamically by the player
  return <Board boardSize={selectedBoardSize}/>;
}

export default App;
