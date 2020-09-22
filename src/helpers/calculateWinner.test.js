import calculateWinner from './calculateWinner'

test('Check if all matches are done', () => {
    const gameComplete = calculateWinner(4, 4, 8)
    expect(gameComplete).toBe(true)
});

test('Check if all matches are not done', () => {
    const gameComplete = calculateWinner(5, 4, 3)
    expect(gameComplete).toBe(false)
});