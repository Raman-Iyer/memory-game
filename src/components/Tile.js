// Imports
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Tile component for individual tiles
function Tile(props){
    // icon is the design and onClick is the handler
    const { index, icon, onClick, tileWidth, finder } = props

    // Add a class to differentiate the regular tile from revealed tile
    let classes = "tile"
    classes += icon === "exclamation" ? " default-tile" : ""
    classes += finder === "" ? "" : " " + finder
    
    // Just a plain button with a onClick event
    return (
        <>
        <button className={classes} data-testid={index} onClick={onClick} style={{flexGrow: 0, flexShrink: 0, flexBasis: `${tileWidth}%`}}>
            <FontAwesomeIcon data-testid={icon} icon={icon} fixedWidth/>
        </button>
        <div>this is a tile</div>
        </>
    )
}

// Exporting the created component
export default Tile