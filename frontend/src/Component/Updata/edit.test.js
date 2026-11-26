
import React from "react";

import {
    render,
    screen,
    waitFor,
    fireEvent
} from "@testing-library/react";

import {
    MemoryRouter,
    Routes,
    Route
} from "react-router-dom";

import axios from "axios";

import Edit from "./edit";

jest.mock("axios");

describe("Edit Component Testing", () => {

    const mockUser = {
        _id: "101",
        fname: "Indresh",
        lname: "Gupta",
        email: "indresh@gmail.com"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("1. Should fetch particular user using ID", async () => {

        axios.get.mockResolvedValue({
            data: mockUser
        });

        render(
            <MemoryRouter
                initialEntries={["/edit/101"]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <Routes>
                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />
                    <Route
                        path="/"
                        element={<div>User List</div>}
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "https://crud-ix4s.onrender.com/api/getOne/101"
            );
        });
    });

    test("2. Should display existing user information", async () => {

        axios.get.mockResolvedValue({
            data: mockUser
        });

        render(
            <MemoryRouter
                initialEntries={["/edit/101"]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <Routes>
                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />
                    <Route
                        path="/"
                        element={<div>User List</div>}
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(
            (await screen.findByLabelText(/first name/i)).value
        ).toBe("Indresh");

        expect(
            screen.getByLabelText(/last name/i).value
        ).toBe("Gupta");

        expect(
            screen.getByLabelText(/email_id/i).value
        ).toBe("indresh@gmail.com");
    });

    test("3. Should update user information using PUT API", async () => {

        axios.get.mockResolvedValue({
            data: mockUser
        });

        axios.put.mockResolvedValue({
            data: {
                ...mockUser,
                fname: "Indresh Updated"
            }
        });

        render(
            <MemoryRouter
                initialEntries={["/edit/101"]}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <Routes>
                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />
                    <Route
                        path="/"
                        element={<div>User List</div>}
                    />
                </Routes>
            </MemoryRouter>
        );

        const firstName = await screen.findByLabelText(
            /first name/i
        );

        // Update the first name directly
        fireEvent.change(firstName, {
            target: {
                name: "fname",
                value: "Indresh Updated"
            }
        });

        // Verify that the input value is updated
        expect(firstName.value).toBe("Indresh Updated");

        // Click Update button
        fireEvent.click(
            screen.getByRole("button", {
                name: /update/i
            })
        );

        // Verify PUT API request
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                "https://crud-ix4s.onrender.com/api/update/101",
                {
                    _id: "101",
                    fname: "Indresh Updated",
                    lname: "Gupta",
                    email: "indresh@gmail.com"
                }
            );
        });
    });

});
