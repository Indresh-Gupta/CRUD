import React from "react";

import {
    render,
    screen,
    waitFor
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import axios from "axios";

import Add from "./Add";

// Mock Axios
jest.mock("axios");

describe("Add Component Testing", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("1. Should render all input fields", () => {

        render(
            <MemoryRouter>
                <Add />
            </MemoryRouter>
        );

        expect(
            screen.getByLabelText(/first name/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/last name/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/password/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /add data/i
            })
        ).toBeInTheDocument();

    });


    test("2. Should update input values", async () => {

        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Add />
            </MemoryRouter>
        );

        await user.type(
            screen.getByLabelText(/first name/i),
            "Indresh"
        );

        await user.type(
            screen.getByLabelText(/last name/i),
            "Gupta"
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "indresh@gmail.com"
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "123456"
        );

        expect(
            screen.getByLabelText(/first name/i)
        ).toHaveValue("Indresh");

        expect(
            screen.getByLabelText(/last name/i)
        ).toHaveValue("Gupta");

        expect(
            screen.getByLabelText(/email/i)
        ).toHaveValue("indresh@gmail.com");

        expect(
            screen.getByLabelText(/password/i)
        ).toHaveValue("123456");

    });


    test("3. Should call POST API with correct user data", async () => {

        const user = userEvent.setup();

        axios.post.mockResolvedValue({
            data: {
                fname: "Indresh",
                lname: "Gupta",
                email: "indresh@gmail.com"
            }
        });

        render(
            <MemoryRouter>
                <Add />
            </MemoryRouter>
        );

        await user.type(
            screen.getByLabelText(/first name/i),
            "Indresh"
        );

        await user.type(
            screen.getByLabelText(/last name/i),
            "Gupta"
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "indresh@gmail.com"
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "123456"
        );

        await user.click(
            screen.getByRole("button", {
                name: /add data/i
            })
        );

        await waitFor(() => {

            expect(axios.post).toHaveBeenCalledWith(
                "https://crud-ix4s.onrender.com/api/create",
                {
                    fname: "Indresh",
                    lname: "Gupta",
                    email: "indresh@gmail.com",
                    password: "123456"
                }
            );

        });

    });

});