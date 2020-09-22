import isMatchFound from './isMatchFound'
import tileList1 from '../data/tests-data/match-test-1'
import tileList2 from '../data/tests-data/match-test-2'
import tileList3 from '../data/tests-data/match-test-3'

test('Check if there is match after 1 match has been found', () => {
    const match = isMatchFound(tileList1)
    expect(match).toBe(true)
});

test('Check if there is no match after different icons have been enabled', () => {
    const match = isMatchFound(tileList2)
    expect(match).toBe(false)
});

test('Check if there is match no previous matches', () => {
    const match = isMatchFound(tileList3)
    expect(match).toBe(true)
});