import { jest } from "@jest/globals";

const mockSave = jest.fn();

jest.unstable_mockModule("../Model/userModel.js", () => ({
    default: jest.fn().mockImplementation(() => ({
        save: mockSave
    }))
}));

const { create } = await import("../Controller/userController.js");
const { default: User } = await import("../Model/userModel.js");

describe("User controller tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("create saves the request body and returns the created user", async () => {
        const savedUser = {
            _id: "mock-user-id",
            fname: "Indresh",
            lname: "Gupta",
            email: "indresh@gmail.com",
            password: "testPassword123"
        };

        mockSave.mockResolvedValue(savedUser);

        const req = {
            body: savedUser
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await create(req, res);

        expect(User).toHaveBeenCalledWith(savedUser);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(savedUser);
    });
});