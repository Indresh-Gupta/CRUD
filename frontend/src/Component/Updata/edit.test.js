import React from "react";

import {
    render,
    screen,
    waitFor
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

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
            <MemoryRouter initialEntries={["/edit/101"]}>

                <Routes>

                    <Route
                        path="/edit/:id"
                        element={<Edit />}
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
            <MemoryRouter initialEntries={["/edit/101"]}>

                <Routes>

                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />

                </Routes>

            </MemoryRouter>
        );

        expect(
            await screen.findByLabelText(/first name/i)
        ).toHaveValue("Indresh");

        expect(
            screen.getByLabelText(/last name/i)
        ).toHaveValue("Gupta");

        expect(
            screen.getByLabelText(/email_id/i)
        ).toHaveValue("indresh@gmail.com");

    });


    test("3. Should update user information using PUT API", async () => {

        const user = userEvent.setup();

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
            <MemoryRouter initialEntries={["/edit/101"]}>

                <Routes>

                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />

                </Routes>

            </MemoryRouter>
        );

        const firstName = await screen.findByLabelText(
            /first name/i
        );

        await user.clear(firstName);

        await user.type(
            firstName,
            "Indresh Updated"
        );

        await user.click(
            screen.getByRole("button", {
                name: /update/i
            })
        );

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