import { render, screen } from "@testing-library/react"
import SigninForm from "./SigninForm"

describe('Login form', () => {
    test('email input box renders', () => {
        render(<SigninForm/>);

        const emailInputBox = screen.getByRole('textbox');
        expect(emailInputBox).toBeInTheDocument;
    });
    test('login button renders', () => {
        render(<SigninForm/>);

        const loginBtn = screen.getByRole('button');
        expect(loginBtn).toBeInTheDocument;
    });
    test('login header renders', () => {
        render(<SigninForm/>);

        const header = screen.getByRole('heading');
        expect(header).toBeInTheDocument;
    });
})