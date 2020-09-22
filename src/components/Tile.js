// Imports
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Tile component for individual tiles
function Tile(props){
    // icon is the design and onClick is the handler
    const { index, icon, onClick, tileWidth } = props

    // Just a plain button with a onClick event
    return (
        <button className="tile" data-testid={index} onClick={onClick} style={{flexGrow: 0, flexShrink: 0, flexBasis: `${tileWidth}%`}}>
            <FontAwesomeIcon icon={icon} fixedWidth/>
        </button>
    )
}

// Exporting the created component
export default Tile