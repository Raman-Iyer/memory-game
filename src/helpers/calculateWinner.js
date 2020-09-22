// Check the match count to the total matches possible and return a boolean
function calculateWinner(row, col, matches) {
    return (row * col / 2) === matches
}

// Export the created function
export default calculateWinner