import initializeBoard from './initializeBoard'

test('Initialize board with 20 Tiles', () => {
    const board = initializeBoard(4, 5)
    expect(board.length).toBe(20)
});

test('Initialize board with 100 Tiles', () => {
    const board = initializeBoard(10, 10)
    expect(board.length).toBe(100)
});