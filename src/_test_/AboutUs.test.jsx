import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import aboutUs from '../Components/aboutUs';

test("renders without crashing", () => {
    render(<aboutUs />);
    const div = document.createElement("div");
    ReactDOM.render(<aboutUs />, div);
});

// test('About Us must have className = "aboutUs"', () => {
//     render(<AboutUs />);
//     const main = screen.getByRole('h2');
//     expect(main).toHaveAttribute('className', 'aboutUs');
// });

