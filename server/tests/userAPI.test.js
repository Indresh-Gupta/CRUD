import { jest } from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../app.js";
import User from "../Model/userModel.js";

jest.setTimeout(120000);

let mongoServer;

const testUser = {
    fname: "Indresh",
    lname: "Gupta",
    email: "indresh@gmail.com",
    password: "testPassword123"
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
        await User.deleteMany({});
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("User API integration tests", () => {
    test("POST /api/create creates a user", async () => {
        const response = await request(app)
            .post("/api/create")
            .send(testUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.fname).toBe(testUser.fname);
        expect(response.body.lname).toBe(testUser.lname);
        expect(response.body.email).toBe(testUser.email);
    });

    test("GET /api/getAll returns users", async () => {
        await User.create(testUser);

        const response = await request(app).get("/api/getAll");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].email).toBe(testUser.email);
    });

    test("GET /api/getOne/:id returns one user", async () => {
        const createdUser = await User.create(testUser);

        const response = await request(app)
            .get(`/api/getOne/${createdUser._id}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(createdUser._id.toString());
        expect(response.body.fname).toBe(testUser.fname);
    });

    test("PUT /api/update/:id updates a user", async () => {
        const createdUser = await User.create(testUser);

        const response = await request(app)
            .put(`/api/update/${createdUser._id}`)
            .send({ fname: "Indresh Updated" });

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(createdUser._id.toString());
        expect(response.body.fname).toBe("Indresh Updated");
        expect(response.body.lname).toBe(testUser.lname);
    });

    test("DELETE /api/delete/:id deletes a user", async () => {
        const createdUser = await User.create(testUser);

        const response = await request(app)
            .delete(`/api/delete/${createdUser._id}`);

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe("deleted successfully");

        const deletedUser = await User.findById(createdUser._id);
        expect(deletedUser).toBeNull();
    });
});