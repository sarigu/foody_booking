const express = require("express");
const bookingRoute = require("../routes/booking");
const request = require("supertest");
const app = express();
app.use("/", bookingRoute);

describe("testing booking routes", () => {
    it("returns only one menu item from the database", async () => {
        const response = await request(app).get("/recommendation");
        console.log(response.body);
        expect(response.body.data).toHaveLength(1);
    });
});