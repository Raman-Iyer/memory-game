// Find the enabled tiles and check their matchId and return a boolean if matched
function isMatchFound(tileList){
    // Filter tiles that are enabled and not marked as found
    const turnedTiles = tileList.filter((tile) => {
        if (tile.enabled && !tile.found){
            return tile
        }
    })

    // Check if the tiles enabled have same matchId
    if (turnedTiles[0].matchId === turnedTiles[1].matchId)
        return true
    return false
}

// Export the created function
export default isMatchFound