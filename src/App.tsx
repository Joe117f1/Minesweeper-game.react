import React from 'react';
import { GameHeader } from './components/game-header/GameHeader';
import { Board } from './components/board/Board';
import { ControllPanel } from './components/controll-panel/ControllPanel';

function App() {
  const selectedBoardSize = 4; //TODO: set dynamically by the player
  return (
    <>
    <GameHeader/>
    <ControllPanel/>
    <Board boardSize={selectedBoardSize}/>
    </>
  );
}

export default App;
