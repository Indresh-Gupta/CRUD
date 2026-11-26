import React from "react";

import {
    render,
    screen,
    waitFor,
    within
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import axios from "axios";

import Userdata from "./Userdata";

jest.mock("axios");


describe("Userdata Component Testing", () => {

    const mockUsers = [
        {
            _id: "101",
            fname: "Indresh",
            lname: "Gupta",
            email: "indresh@gmail.com"
        },
        {
            _id: "102",
            fname: "Rahul",
            lname: "Sharma",
            email: "rahul@gmail.com"
        }
    ];

    beforeEach(() => {

        jest.clearAllMocks();

    });


    test("1. Should render heading and Add new data button", () => {

        axios.get.mockResolvedValue({
            data: []
        });

        render(
            <MemoryRouter>
                <Userdata />
            </MemoryRouter>
        );

        expect(
            screen.getByText(/user all information shown here/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /add new data/i
            })
        ).toBeInTheDocument();

    });


    test("2. Should call GET API when component renders", async () => {

        axios.get.mockResolvedValue({
            data: mockUsers
        });

        render(
            <MemoryRouter>
                <Userdata />
            </MemoryRouter>
        );

        await waitFor(() => {

            expect(axios.get).toHaveBeenCalledWith(
                "https://crud-ix4s.onrender.com/api/getAll"
            );

        });

    });


    test("3. Should display all users from API", async () => {

        axios.get.mockResolvedValue({
            data: mockUsers
        });

        render(
            <MemoryRouter>
                <Userdata />
            </MemoryRouter>
        );

        expect(
            await screen.findByText("Indresh Gupta")
        ).toBeInTheDocument();

        expect(
            screen.getByText("indresh@gmail.com")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Rahul Sharma")
        ).toBeInTheDocument();

        expect(
            screen.getByText("rahul@gmail.com")
        ).toBeInTheDocument();

    });


    test("4. Should delete selected user", async () => {

        const user = userEvent.setup();

        axios.get.mockResolvedValue({
            data: mockUsers
        });

        axios.delete.mockResolvedValue({
            data: {
                msg: "deleted successfully"
            }
        });

        render(
            <MemoryRouter>
                <Userdata />
            </MemoryRouter>
        );

        await screen.findByText("Indresh Gupta");

        const deleteButtons = screen.getAllByRole(
            "button",
            { name: /delete/i }
        );

        await user.click(deleteButtons[0]);

        await waitFor(() => {

            expect(axios.delete).toHaveBeenCalledWith(
                "https://crud-ix4s.onrender.com/api/delete/101"
            );

        });

        await waitFor(() => {

            expect(
                screen.queryByText("Indresh Gupta")
            ).not.toBeInTheDocument();

        });

        expect(
            screen.getByText("Rahul Sharma")
        ).toBeInTheDocument();

    });


    test("5. Should navigate to Add page", () => {

    axios.get.mockResolvedValue({
        data: []
    });

    render(
        <MemoryRouter>
            <Userdata />
        </MemoryRouter>
    );

    expect(
        screen.getByRole("link", {
            name: /add new data/i
        })
    ).toHaveAttribute("href", "/Add");

});

});