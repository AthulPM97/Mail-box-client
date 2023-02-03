import { render, screen } from "@testing-library/react"
import Auth from "./Auth"

describe('auth page',() => {
    test('render sign up header on load', () => {
        render(<Auth/>);

        const signuptitleElement = screen.getByRole('heading');
        expect(signuptitleElement).toBeInTheDocument();
    });
    test('render email input box on load', () => {
        render(<Auth/>);

        const inputBox = screen.getAllByRole('textbox');
        expect(inputBox).toHaveLength(1);
    });
    test('render sign up button', () => {
        render(<Auth/>);

        const signupBtns = screen.getAllByRole('button');
        expect(signupBtns).toBeInTheDocument;
    });
})