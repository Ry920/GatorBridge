const server = require('./index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const mysql = require('mysql2');
require("dotenv").config();

const con2 = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

describe('User login and signup', () => {
    test('POST /signup should create a new user account successfully', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            firstname: "John",
            lastname: "Doe",
            email: "jdoe@ufl.edu",
            password: "testing123"
        });
        expect(res.ok).toBe(true);
    });
    test('POST /signup should not allow more than 1 account with the same email', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            firstname: "Lebron",
            lastname: "James",
            email: "jdoe@ufl.edu",
            password: "hello"
        });
        expect(res.ok).toBe(false);
    });
    test('POST /signup should not allow non-UF emails', async () => {
        const res = await requestWithSupertest.post('/signup').send({
            firstname: "John",
            lastname: "Doe",
            email: "jdoe@definitely.uf.edu",
            password: "testing123"
        });
        expect(res.ok).toBe(false);
    });
    test('POST /signup should not allow any empty fields', async () => {
        var res = await requestWithSupertest.post('/signup').send({
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/signup').send({
            firstname: "John",
            lastname: "",
            email: "",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/signup').send({
            firstname: "",
            lastname: "Doe",
            email: "",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/signup').send({
            firstname: "",
            lastname: "",
            email: "jdoe@ufl.edu",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/signup').send({
            userFirstName: "",
            lastname: "",
            email: "",
            password: "testing123"
        });
        expect(res.ok).toBe(false);
    });
    test('POST /login should authenticate user account successfully', async () => {
        const res = await requestWithSupertest.post('/login').send({
            email: "jdoe@ufl.edu",
            password: "testing123"
        });
        expect(res.ok).toBe(true);
    });
    test('POST /login should deny login with wrong password', async () => {
        const res = await requestWithSupertest.post('/login').send({
            email: "jdoe@ufl.edu",
            password: "testing1234"
        });
        expect(res.ok).toBe(false);
    });
    test('POST /login should not accept any empty fields', async () => {
        var res = await requestWithSupertest.post('/login').send({
            email: "",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/login').send({
            email: "jdoe@ufl.edu",
            password: ""
        });
        expect(res.ok).toBe(false);
        res = await requestWithSupertest.post('/login').send({
            email: "",
            password: "testing123"
        });
        expect(res.ok).toBe(false);
    });
    afterAll(async () => {
        con2.query("TRUNCATE TABLE users");
    });
});
