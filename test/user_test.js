const server = require('../index');
const chaiHttp = require("chai-http");
const chai = require('chai');
const path = require('path');
const userSchema = require('../models/userSchema');
const routes = require('../routes/userRouter');


chai.should();
chai.use(chaiHttp);

describe("User Login API",()=>{
    
    //Test the Get resourceLimits
    describe("POST /api/user",()=>{
        it("IT should Return login user detail :" ,(done)=>{
            const data ={
                userEmail:"mayankjais@gmail.com",
                userPassword:"mamayankN@123",

            };
            chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err,res) => {
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