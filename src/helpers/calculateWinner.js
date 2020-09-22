function calculateWinner(row, col, matches) {
    return (row * col / 2) === matches
}

export default calculateWinner