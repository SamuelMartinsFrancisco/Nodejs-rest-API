import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';
import HeroService from '../../src/services/heroService.js';

test('Hero Integration Test Suite', async (t) => {
    const testPort = 9009;

    // that's a bad practice because it mutates the environment
    process.env.PORT = testPort;
    const { server } = await import('../../src/index.js');
    const testServerAddress = `http://localhost:${testPort}/heroes`;

    ////////////////////////////////////////////////////////////////////////////////////
    await t.test('it should create a hero', async (t) => {
        const data = {
            name: "Batman",
            age: 50,
            power: "rich"
        }

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        // https://nodejs.org/api/assert.html#assertdeepstrictequalactual-expected-message
        assert.deepStrictEqual(
            request.headers.get('content-type'),
            'application/json'
        );

        // https://nodejs.org/api/assert.html#assertstrictequalactual-expected-message
        assert.strictEqual(request.status, 201);

        const result = await request.json();
        assert.deepStrictEqual(
            result.success,
            'User created with success!!',
            'it should return a valid text message'
        );
        
        // https://nodejs.org/api/assert.html#assertokvalue-message
        assert.ok( 
            result.id.length > 30,
            'id should be a valid uuid'
        );
    });

    /////////////////////////////////////////////////////////////////////////////////////////////
    await t.test('it should retrieve the heroes data', async (t) => {
        const request = await fetch(testServerAddress, {
            method: 'GET'
        });

        const result = await request.json();
       
        assert.strictEqual(request.status, 200);  // ??

        // https://nodejs.org/api/assert.html
        // https://www.baeldung.com/integration-testing-a-rest-api
    });

    await promisify(server.close.bind(server))();   // http://cangaceirojavascript.com.br/por-que-voce-deveria-estar-usando-util-promisify/
});

// to run tests -> node tests/integration/hero.test.js
//           or -> node --test test/ 