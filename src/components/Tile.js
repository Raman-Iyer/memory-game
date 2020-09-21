// Imports
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Tile component for individual tiles
function Tile(props){
    // icon is the design and onClick is the handler
    const { index, icon, onClick } = props

    // Just a plain button with a onClick event
    return (
        <button data-testid={index} onClick={onClick}>
            <FontAwesomeIcon icon={icon} size="3x" fixedWidth/>
        </button>
    )
}

// Exporting the created component
export default Tile