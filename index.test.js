// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const { seedMusician, seedBand } = require("./seedData");

describe('./musicians endpoint', () => {
    // Write your tests here

    test('GET /musicians', async () => {
        const response = await request(app).get('/musicians');
        expect(response.status).toBe(200);
    });

    test("musicians endpoint", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        responseData;
        console.log(responseData[0].name);
        expect(responseData[0].name).toBe(seedMusician[0].name);
    });

    test('GET /musicians', async () => {
        const response = await request(app).get('/musicians');
        expect(response.status).toBe(200);
        const responseData = JSON.parse(response.text);
        console.log(responseData);
        expect(responseData[0].name).toBe('Mick Jagger');
        expect(responseData[1].name).toBe('Drake');
        expect(responseData[2].name).toBe('Jimi Hendrix');
    });

    test('GET /musicians/:id', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.status).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe('Mick Jagger');
    });

    test('POST /musicians', async () => {
        const response = await request(app)
            .post('/musicians')
            .send({
                name: 'John Lennon',
                instrument: 'Guitar'
            });
        expect(response.status).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe('John Lennon');
    });

    test('PUT /musicians/:id', async () => {
        const response = await request(app)
            .put('/musicians/1')
            .send({
                name: 'Elton John',
                instrument: 'Piano'
            });
        expect(response.status).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe('Elton John');
    });

    test('DELETE /musicians/:id', async () => {
        const response = await request(app).delete('/musicians/4');
        expect(response.status).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toBe('John Lennon');
    });
    
});
