const server = require('./index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const mysql = require('mysql2');

const con2 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

describe('User login and signup', () => {
    test('POST /signup should create a new user account successfully', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            userFirstName: "John",
            userLastName: "Doe",
            userEmail: "jdoe@ufl.edu",
            userPassword: "testing123"
        });
        expect(res.status).toBe(201);
    });
    test('POST /signup should not allow more than 1 account with the same email', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            userFirstName: "Lebron",
            userLastName: "James",
            userEmail: "jdoe@ufl.edu",
            userPassword: "hello"
        });
        expect(res.status).toBe(400);
    });
    test('POST /signup should not allow non-UF emails', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            userFirstName: "John",
            userLastName: "Doe",
            userEmail: "jdoe@definitely.uf.edu",
            userPassword: "testing123"
        });
        expect(res.status).toBe(400);
    });
    test('POST /signup should not allow any empty fields', async () => {
        var res = await requestWithSupertest.post('/signup').send({
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/signup').send({
            userFirstName: "John",
            userLastName: "",
            userEmail: "",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/signup').send({
            userFirstName: "",
            userLastName: "Doe",
            userEmail: "",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/signup').send({
            userFirstName: "",
            userLastName: "",
            userEmail: "jdoe@ufl.edu",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/signup').send({
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userPassword: "testing123"
        });
        expect(res.status).toBe(400);
    });
    test('POST /login should authenticate user account successfully', async () => {
        const res = await requestWithSupertest.post('/login').send({
            userEmail: "jdoe@ufl.edu",
            userPassword: "testing123"
        });
        expect(res.status).toBe(201);
    });
    test('POST /login should authenticate user account successfully', async () => {
        const res = await requestWithSupertest.post('/login').send({
            userEmail: "jdoe@ufl.edu",
            userPassword: "testing123"
        });
        expect(res.status).toBe(201);
    });
    test('POST /login should deny login with wrong password', async () => {
        const res = await requestWithSupertest.post('/login').send({
            userEmail: "jdoe@ufl.edu",
            userPassword: "testing1234"
        });
        expect(res.status).toBe(400);
    });
    test('POST /login should not accept any empty fields', async () => {
        var res = await requestWithSupertest.post('/login').send({
            userEmail: "",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/login').send({
            userEmail: "jdoe@ufl.edu",
            userPassword: ""
        });
        expect(res.status).toBe(400);
        res = await requestWithSupertest.post('/login').send({
            userEmail: "",
            userPassword: "testing123"
        });
        expect(res.status).toBe(400);
    });
    afterAll(async () => {
        con2.query("TRUNCATE TABLE users");
    });
});
