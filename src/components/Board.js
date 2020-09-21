// Imports
import React from 'react'
import Tile from './Tile'

// Board component to hold all the boxes
function Board(props) {
    // tileList is an array of all boxes and onClick is the handler
    const { tileList, onClick, defaultIcon } = props
    // Add all the boxes with an index to keep track of the box that was click
    return (
        <div>
            {
                // Map the tileList prop to set the corresponding values in each tile
                tileList.map((tile, i) => {
                    let {icon, enabled} = tile
                    return (
                        <Tile key={i} index={i} icon={enabled ? icon : defaultIcon} onClick={() => {
                            onClick(i)
                        }} />
                    )
                })
            }
        </div>
    )
}

// Export the created component
export default Board