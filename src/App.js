// Imports
import React, { useState } from 'react';
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

  // Check for Winner after every move
  const winner = calculateWinner(row, col, matches)

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
        matchId: tile.matchId
      }
    })
  }

  function handleClick(i) {
    if (tileList[i].enabled || isProcessing || winner) return

    const newList = tileList.map((tile, index) => {
      if (index === i) {
        return {
          icon: tile.icon,
          enabled: true,
          found: tile.found,
          matchId: tile.matchId
        }
      }
      return tile
    })
    if (isTileTurned) {
      if (isMatchFound(newList)) {
        if (turn === "p1") {
          setP1Score(p1Score + 1)
        }
        else {
          setP2Score(p2Score + 1)
        }
        const foundTiles = newList.map((tile) => {
          if (tile.enabled && !tile.found) {
            return {
              icon: tile.icon,
              enabled: tile.enabled,
              found: true,
              matchId: tile.matchId
            }
          }
          return tile
        })
        setIsTileTurned(false)
        setTileList(foundTiles)
        setMatches(matches + 1)
        //setTurn(turn === "p1" ? "p2" : "p1")
      }
      else {
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
      setIsTileTurned(true)
      setTileList(newList)
    }
  }

  function handleOnChange(e) {
    let { id, value } = e.target
    value = parseInt(value)
    if (id === "row") {
      setIsValidGrid(((col % 2 !== 0 && value % 2 !== 0) || col * value < 4) ? false : true)
      setRow(value)
    }
    else {
      setIsValidGrid(((row % 2 !== 0 && value % 2 !== 0) || row * value < 4) ? false : true)
      setCol(value)
    }
  }

  function handleReset() {
    setIsGameStarted(false)
    //setRow(2)
    //setCol(2)
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
          <h3>Select Grid Size</h3>
          <input className="grid-input" onChange={handleOnChange} id="row" type="number" value={row} />
          <FontAwesomeIcon icon={"times"} fixedWidth />
          <input className="grid-input" onChange={handleOnChange} id="col" type="number" value={col} />
        </div>
        <h4 className="error" style={{ display: !isValidGrid ? "block" : "none" }}>The Grid Entered had odd number of cells or the cell count is less than 4</h4>
        <button className="button start" style={{ display: isValidGrid ? "inline-block" : "none" }} onClick={initializeBoard}>Start Game!</button>
      </div>
      <div className="game" style={{ display: isGameStarted ? "block" : "none" }}>
        <div>
          <div>
            <h3>Score:-</h3>
            <h4 className="score">Player 1 : {p1Score}</h4>
            <h4 className="score">Player 2 : {p2Score}</h4>
          </div>
        </div>
        <div>
          <h2>Board</h2>
          <div>
            <h3>{winner ?
              p1Score === p2Score ? "Game is a draw!" : p1Score > p2Score ? "Player 1 Wins!" : "Player 2 Wins!" : turn === "p1" ? "Player 1's Turn" : "Player 2's Turn"}</h3>
          </div>
          <Board tileList={tileList} onClick={handleClick} defaultIcon={defaultIcon} col={col} />
        </div>
        <button class="button reset" onClick={handleReset} style={{ display: winner ? "inline-block" : "none" }}>Reset!</button>
      </div>
    </div>
  );
}

export default App;
