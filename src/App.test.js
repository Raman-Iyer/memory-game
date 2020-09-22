import React from 'react'
import { render, getByTestId, fireEvent } from '@testing-library/react'
import App from './App'


test('Given a valid grid row and col should show start game button', () => {
    const { container } = render(<App />)
    const rowInput = getByTestId(container, "row")
    const colInput = getByTestId(container, "col")
    const startButton = getByTestId(container, "start")
    fireEvent.change(rowInput, { target: { value: 6 } })
    fireEvent.change(colInput, { target: { value: 6 } })
    expect(startButton.style.display).toBe("inline-block")
})

test('Given a odd row and col should hide start game button and display error', () => {
    const { container } = render(<App />)
    const rowInput = getByTestId(container, "row")
    const colInput = getByTestId(container, "col")
    const startButton = getByTestId(container, "start")
    const error = getByTestId(container, "error")
    fireEvent.change(rowInput, { target: { value: 5 } })
    fireEvent.change(colInput, { target: { value: 5 } })
    expect(startButton.style.display).toBe("none")
    expect(error.style.display).toBe("block")
})

test('Given a more than 100 tiles should hide start game button and display error', () => {
    const { container } = render(<App />)
    const rowInput = getByTestId(container, "row")
    const colInput = getByTestId(container, "col")
    const startButton = getByTestId(container, "start")
    const error = getByTestId(container, "error")
    fireEvent.change(rowInput, { target: { value: 11 } })
    fireEvent.change(colInput, { target: { value: 10 } })
    expect(startButton.style.display).toBe("none")
    expect(error.style.display).toBe("block")
})