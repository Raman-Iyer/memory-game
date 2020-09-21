function isMatchFound(tileList){
    const turnedTiles = tileList.filter((tile) => {
        if (tile.enabled && !tile.found){
            return tile
        }
    })
    if (turnedTiles[0].matchId === turnedTiles[1].matchId)
        return true
    return false
}

export default isMatchFound