import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import contactUs from '../Components/contactUs';

test("renders without crashing", () => {
    render(<contactUs />);
    const div = document.createElement("div");
    ReactDOM.render(<contactUs />, div);
});
