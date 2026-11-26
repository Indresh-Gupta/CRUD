import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import User from "../Model/userModel.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();

    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("User model tests", () => {

    test("creates a user with valid required fields", async () => {
        const user = await User.create({
            fname: "Indresh",
            lname: "Gupta",
            email: "indresh@gmail.com",
            password: "testPassword123"
        });

        expect(user._id).toBeDefined();
        expect(user.fname).toBe("Indresh");
        expect(user.lname).toBe("Gupta");
        expect(user.email).toBe("indresh@gmail.com");
    });

    test("rejects a user when required fields are missing", async () => {
        const user = new User({
            fname: "Indresh"
        });

        await expect(user.validate()).rejects.toMatchObject({
            name: "ValidationError"
        });
    });
});