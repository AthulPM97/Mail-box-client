import { render, screen } from "@testing-library/react"
import TopBar from "../TopBar"

describe('Top bar of the mailbox', () => {
    test('render delete button', () => {
        render(<TopBar/>);

        const deleteBtn = screen.getByText("Delete");
        expect(deleteBtn).toBeInTheDocument;
    });
    test('render archive button', () => {
        render(<TopBar/>);

        const archiveBtn = screen.getByText("Archive");
        expect(archiveBtn).toBeInTheDocument;
    });
    test('render spam button', () => {
        render(<TopBar/>);

        const spamBtn = screen.getByText("Spam");
        expect(spamBtn).toBeInTheDocument;
    });
})