import { render, screen } from "@testing-library/react"
import SideMenu from "./SideMenu"

describe('side menu of mailbox', () => {
    test('renders a ul', () => {
        render(<SideMenu/>);

        const ulList = screen.getByRole('list');
        expect(ulList).toBeInTheDocument;
    });
    test('renders two list items', () => {
        render(<SideMenu/>);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });
});