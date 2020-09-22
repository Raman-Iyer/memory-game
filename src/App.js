// Imports
import React, { useState } from 'react';
import './App.css';
import './fontawesome'
import Board from './components/Board';
import initBoard from './helpers/initializeBoard'
import isMatchFound from './helpers/isMatchFound'

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
    if (tileList[i].enabled || isProcessing) return

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
        setTurn(turn === "p1" ? "p2" : "p1")
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

  return (
    <div className="App">
      <div>
        <input onChange={handleOnChange} id="row" type="number" value={row} />
        <span>X</span>
        <input onChange={handleOnChange} id="col" type="number" value={col} />
      </div>
      <button style={{ display: isValidGrid ? "inline-block" : "none" }} onClick={initializeBoard}>Start!</button>
      <div>{turn} Player 1 : {p1Score} Player 2 : {p2Score}</div>
      <div style={{ display: isGameStarted ? "block" : "none" }}>
        <Board tileList={tileList} onClick={handleClick} defaultIcon={defaultIcon} col={col}/>
      </div>
    </div>
  );
}

export default App;
