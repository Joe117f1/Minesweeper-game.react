import React from 'react';
import { GameHeader } from './components/game-header/GameHeader';
import { Board } from './components/board/Board';

function App() {
  const selectedBoardSize = 4; //TODO: set dynamically by the player
  return (
    <>
    <GameHeader/>
    <Board boardSize={selectedBoardSize}/>
    </>
  );
}

export default App;
