const server = require('../index');
const chaiHttp = require("chai-http");
const chai = require('chai');
const path = require('path');
const userSchema = require('../models/userSchema');
const routes = require('../routes/userRouter');
const { request } = require('http');


chai.should();
chai.use(chaiHttp);

describe("User Login API", () => {

    //Test the Get resourceLimits
    describe("POST /api/user", () => {
        it("IT should Return login user detail :", (done) => {
            const data = {
                userEmail: "mayankjais@gmail.com",
                userPassword: "mamayankN@123",

            };
            chai
                .request(server)
                .post("/user/login")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.be.a("object")
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Login successfully");
                    res.body.should.have.property("token");
                    done();
                });
        });
    })
})

describe("Using SignUp API ", () => {

    //Test the get resourcesLimits
    describe("POST /api/user", () => {
        it("IT should Return Signup user details:", (done) => {
            let random = Math.floor(Math.random() * 1000)
            const data = {
                userName: "mayank jaiswal",
                userEmail: `mayankjaiswal22${random}@gmail.com`,
                userPassword: "Mj_mayank@123",
                userPhone: "9340163319",
                userCity: "indore",
                userState: "M.p",
                userAddress: "geeta bhawan",
            };
            chai
                .request(server)
                .post("/user/signup")
                .set("Content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("profilePic", 'Resume_pic.JPG')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.be.a("object")
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Registration successfull");
                    done();

                })

        })

    })
})