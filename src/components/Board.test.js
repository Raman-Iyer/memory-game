import React from 'react'
import { render, getAllByTestId } from '@testing-library/react'
import Board from './Board'
import tileList1 from '../data/tests-data/board-test-1'
import tileList2 from '../data/tests-data/board-test-2'
import tileList3 from '../data/tests-data/board-test-3'


test('renders boxes with 2 bomb and 2 radiation', () => {
    const { container } = render(<Board tileList={tileList1} col="2" />)
    const bombTile = getAllByTestId(container, "bomb");
    expect(bombTile.length).toBe(2)
    const radiationTile = getAllByTestId(container, "radiation");
    expect(radiationTile.length).toBe(2)
})

test('renders boxes with 1 bomb and 3 exclamation', () => {
    const { container } = render(<Board tileList={tileList2} defaultIcon="exclamation" col="2" />)
    const bombTile = getAllByTestId(container, "bomb");
    expect(bombTile.length).toBe(1)
    const exclamationTile = getAllByTestId(container, "exclamation");
    expect(exclamationTile.length).toBe(3)
})

test('renders boxes with 1 dragon, 1 brain and 2 exclamation', () => {
    const { container } = render(<Board tileList={tileList3} defaultIcon="exclamation" col="2" />)
    const dragonTile = getAllByTestId(container, "dragon");
    expect(dragonTile.length).toBe(1)
    const brain = getAllByTestId(container, "brain");
    expect(brain.length).toBe(1)
    const exclamationTile = getAllByTestId(container, "exclamation");
    expect(exclamationTile.length).toBe(2)
})