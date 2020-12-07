// Imports
import React, { useEffect, useState } from 'react'
import Tile from './Tile'

// Board component to hold all the boxes
function Board(props) {
    // tileList is an array of all boxes and onClick is the handler
    const { tileList, onClick, defaultIcon, col } = props

    // useState Hooks
    const [tileWidth, setTileWidth] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)

    // useEffect Hook
    useEffect(() => {
        // function calculates the width of container and the flex basis property
        let width = 80 * col
        setContainerWidth(width)
        setTileWidth(Math.ceil((100 / col) * 1000) / 1000)
    }, [col])

    // Add all the boxes with an index to keep track of the box that was click
    return (
        <>
        <div>efgh</div>
        <div style={{width : containerWidth}} className="board">
            {
                // Map the tileList prop to set the corresponding values in each tile
                tileList.map((tile, i) => {
                    let { icon, enabled } = tile
                    return (
                        <Tile key={i} index={i} icon={enabled ? icon : defaultIcon} onClick={() => {
                            onClick(i)
                        }} tileWidth={tileWidth} finder={tile.finder} />
                    )
                })
            }
        </div>
        </>
    )
}

// Export the created component
export default Board