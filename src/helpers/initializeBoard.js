// Imports
import iconList from '../data/iconList'


// Get Random Postiion
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

// Initialize random positions for the icons list
function initBoard(rows, cols) {
    const tiles = rows * cols
    const icons = iconList.sort(() => Math.random() - 0.5).slice(0, tiles / 2)
    let counter = 0
    let positionHolders = Array(tiles).fill(null).map((position) => {
        return counter++;
    })

    let newTilelist = Array(tiles).fill(null)
    for (let i = 0; i < icons.length; i++) {
        let randomPos = getRandomInt(positionHolders.length)
        let position1 = positionHolders[randomPos]
        newTilelist[position1] = {
            icon: icons[i],
            enabled: false,
            found: false,
            matchId: i
        }
        positionHolders.splice(randomPos, 1)

        randomPos = getRandomInt(positionHolders.length)
        let position2 = positionHolders[randomPos]
        newTilelist[position2] = {
            icon: icons[i],
            enabled: false,
            found: false,
            matchId: i
        }
        positionHolders.splice(randomPos, 1)
    }

    return newTilelist
}

export default initBoard