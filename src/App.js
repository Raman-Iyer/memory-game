// Imports
import React, { useEffect, useState } from 'react';
import './App.css';
import './fontawesome'
import Board from './components/Board';
import initBoard from './helpers/initializeBoard'
import isMatchFound from './helpers/isMatchFound'
import calculateWinner from './helpers/calculateWinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App Component
function App() {
  // Default Icon to be displayed when the tiles are not turned around
  const defaultIcon = "exclamation"

  // useState Hooks
  const [tileList, setTileList] = useState([])
  const [isValidGrid, setIsValidGrid] = useState(true)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isTileTurned, setIsTileTurned] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [turn, setTurn] = useState("p1")
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
  const [row, setRow] = useState(2)
  const [col, setCol] = useState(2)
  const [matches, setMatches] = useState(0)
  const [winner, setWinner] = useState(false)

  // Check for Winner after every move
  useEffect(() => {
    setWinner(calculateWinner(row, col, matches))
  })

  // Set the default state
  function initializeBoard() {
    setTileList(initBoard(row, col))
    setIsGameStarted(true)
  }

  // flip the turned over tiles
  function flipTiles() {
    return tileList.map((tile) => {
      if (tile.found) {
        return tile
      }
      return {
        icon: tile.icon,
        enabled: false,
        found: tile.found,
        finder: tile.finder,
        matchId: tile.matchId
      }
    })
  }

  // Handle the clicks on the tiles and process further
  function handleTileClick(i) {
    // Should be handled only if the tile is not turned over, there is no winner
    // The tiles are turned back in settimeout thus, no clicks to be handled during that time
    if (tileList[i].enabled || isProcessing || winner) return

    // Change the enabled to true for the selected tile
    const newList = tileList.map((tile, index) => {
      if (index === i) {
        return {
          icon: tile.icon,
          enabled: true,
          found: tile.found,
          finder: tile.finder,
          matchId: tile.matchId
        }
      }
      return tile
    })
    // Check if a tile is already turned if so check for match and if not then just turn the tile
    if (isTileTurned) {
      // Check for match if any
      if (isMatchFound(newList)) {
        // Add the score according to the turn of the player
        if (turn === "p1") {
          setP1Score(p1Score + 1)
        }
        else {
          setP2Score(p2Score + 1)
        }
        // Update the tiles that are found and set the found boolean to true and add the finder
        const foundTiles = newList.map((tile) => {
          if (tile.enabled && !tile.found) {
            return {
              icon: tile.icon,
              enabled: tile.enabled,
              found: true,
              finder: turn,
              matchId: tile.matchId
            }
          }
          return tile
        })
        // Set the states of the new board and increment the match count after every match
        // This is done to keep track of the game over state
        setIsTileTurned(false)
        setTileList(foundTiles)
        setMatches(matches + 1)
        // This is gameplay dependent logic
        // If this line is commented then player finding a match will continue the turn
        // If not then turns are switched irrespective of the match found
        //setTurn(turn === "p1" ? "p2" : "p1")
      }
      else {
        // Change the tiles to the previous state after one second so as to show what was underneath the tile
        setIsProcessing(true)
        setTileList(newList)
        setTimeout(() => {
          const flippedTiles = flipTiles()
          setIsTileTurned(false)
          setTileList(flippedTiles)
          setIsProcessing(false)
          setTurn(turn === "p1" ? "p2" : "p1")
        }, 1000)
      }
    }
    else {
      // Turn the tile over and continue
      setIsTileTurned(true)
      setTileList(newList)
    }
  }

  // Validate grid values if they are proper
  function validateGrid(row, col){
    return !((row % 2 !== 0 && col % 2 !== 0) || col * row < 4 || col * row > 100)
  }

  // Handle the change of the grid size and check for the grid validitiy
  function handleOnGridInputChange(e) {
    let { id, value } = e.target
    value = parseInt(value)
    if (id === "row") {
      // Grid is valid only if the cells are even and the cell count >= 4
      setIsValidGrid(validateGrid(value, col))
      setRow(value)
    }
    else {
      setIsValidGrid(validateGrid(row, value))
      setCol(value)
    }
  }

  // Handle the reset button click and set everything to the default state except the grid size
  function handleReset() {
    setIsGameStarted(false)
    setTileList([])
    setIsValidGrid(true)
    setP1Score(0)
    setP2Score(0)
    setTurn("p1")
    setMatches(0)
  }

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <div style={{ display: !isGameStarted ? "block" : "none" }}>
        <div>
          {/* Select the size of the grid to be played (Max is 10 X 10) */}
          <h3>Select Grid Size</h3>
          <label htmlFor="row">Row</label>
          <input className="grid-input" onChange={handleOnGridInputChange} id="row" type="number" value={row} />
          <FontAwesomeIcon icon={"times"} fixedWidth />
          <input className="grid-input" onChange={handleOnGridInputChange} id="col" type="number" value={col} />
          <label htmlFor="col">Col</label>
        </div>
        {/* Show error message if the grid is invalid */}
        <h4 className="error" style={{ display: !isValidGrid ? "block" : "none" }}>The Grid Entered had odd number of cells or the cell count is not between 4 and 100</h4>
        {/* Show the start game button only when the grid is valid */}
        <button className="button start" style={{ display: isValidGrid ? "inline-block" : "none" }} onClick={initializeBoard}>Start Game!</button>
      </div>
      <div className="game" style={{ display: isGameStarted ? "block" : "none" }}>
        <div>
          <div>
            {/* The score of the players are displayed here */}
            <h3>Score:-</h3>
            <h4 className="score">Player 1 : <span className="p1">{p1Score}</span></h4>
            <h4 className="score">Player 2 : <span className="p2">{p2Score}</span></h4>
          </div>
        </div>
        <div>
          <h2>Board</h2>
          <div>
            {/* On basis of winner or turn display appropriate message */}
            <h3>{winner ? p1Score === p2Score ? "Game is a draw!" : p1Score > p2Score ? "Player 1 Wins!" : "Player 2 Wins!" : turn === "p1" ? "Player 1's Turn" : "Player 2's Turn"}</h3>
          </div>
          <Board tileList={tileList} onClick={handleTileClick} defaultIcon={defaultIcon} col={col} />
        </div>
        {/* Reset the state again after the game is completed */}
        <button class="button reset" onClick={handleReset} style={{ display: winner ? "inline-block" : "none" }}>Reset!</button>
      </div>
    </div>
  );
}

// Export the created component
export default App;
