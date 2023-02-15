const express = require("express");
const { faker } = require('@faker-js/faker');
const port = 8000;

const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const createUser = () => {
    const newUser = {
        password : faker.internet.password(),
        email : faker.internet.email(),
        phoneNumber : faker.phone.number(),
        lastName : faker.name.lastName(),
        firstName : faker.name.firstName(),
        _id : faker.datatype.uuid()
    }
    return newUser;
};

const createCompany = () => {
    const newCompany = {
        _id : faker.datatype.uuid(),
        name : faker.company.name(),
        address : {
            street : faker.address.street(),
            city : faker.address.city(),
            state : faker.address.state(),
            zipCode : faker.address.zipCode(),
            country : faker.address.country()
        }
    }
    return newCompany;
};

app.get("/", (req, res) => {
    return res.send("Welcome to Fake Company App")
})

app.get("/api/users/new", (req, res) => {
    return res.json(createUser());
})

app.get("/api/companies/new", (req, res) => {
    return res.json(createCompany());
})

app.get("/api/user/company", (req, res) => {
    return res.json({
        user : createUser(),
        company : createCompany()
    })
})

app.listen( port, () => console.log(`Listening on port: ${port}`) );