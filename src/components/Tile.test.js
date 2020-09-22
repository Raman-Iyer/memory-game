import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import Tile from './Tile';

test('renders button with exclamation icon', () => {
    const { container } = render(<Tile icon='exclamation' tileWidth="100" finder="" />);
    const buttonElement = getByTestId(container, "exclamation");
    expect(buttonElement).toBeInTheDocument();
});

test('renders button with bomb icon', () => {
    const { container } = render(<Tile icon='bomb' tileWidth="100" finder="" />);
    const buttonElement = getByTestId(container, "bomb");
    expect(buttonElement).toBeInTheDocument();
});

test('renders button with radiation icon', () => {
    const { container } = render(<Tile icon='radiation' tileWidth="100" finder="p1" />);
    const buttonElement = getByTestId(container, "radiation");
    expect(buttonElement).toBeInTheDocument();
});