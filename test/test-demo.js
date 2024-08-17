const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')
const assert = chai.assert

describe('API Test for "reqres.in"', () => {
    const BASE_URL = "https://reqres.in/api/"

    it('Test - GET List User', async () => {
        const response = await request(BASE_URL)
        .get("users")

        console.log(response.statusCode);
        console.log(response.body);

        //asertion
        const schemaPath = "resource/jsonSchema/get-list-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });


    it('Test - POST Register User', async() => {
        const body = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
        const response = await request(BASE_URL)
        .post("register")
        .send(body)

        console.log(response.statusCode);
        console.log(response.body);

        //asertion
        const schemaPath = "resource/jsonSchema/post-register-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        
    });


    it('Test - DELETE', async () => {
        const response = await request(BASE_URL)
        .delete("users/2")

        console.log(response.statusCode);
        console.log(response.body);

        //asertion
        const schemaPath = "resource/jsonSchema/delete-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });


    it('Test - PUT Update User', async() => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
        .put("users/2")
        .send(body)

        console.log(response.statusCode);
        console.log(response.body);

        //asertion
        const schemaPath = "resource/jsonSchema/put-update-users-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        
    });
});