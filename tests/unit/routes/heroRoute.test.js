import test from 'node:test';
import assert, { CallTracker } from 'node:assert';  // CallTracker -> https://nodejs.org/api/assert.html#class-assertcalltracker
const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());
import { routes } from './../../../src/routes/heroRoute.js';
import { DEFAULT_HEADER } from '../../../src/util/util.js';

test('Hero routes - endpoints test suite', async (t) => {
    await t.test('it should call /heroes:get route', async () => {
        const databaseMock = [{
            "id": "7ab75790-507d-4612-bb69-70cf72195795",
            "name": "Batman",
            "age": 50,
            "power": "rich"
        }]; 

        const heroServiceStub = {
            find: async () => databaseMock
        };
    
        const endpoints = routes({
            heroService: heroServiceStub
        });

        const endpoint = '/heroes:get';
        const request = {};
        const response = {
            // https://nodejs.org/api/assert.html#trackercallsfn-exact
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                });
                assert.strictEqual(
                    item,
                    expected,
                    'write should be called with the correct payload' 
                );
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(
                    item,
                    undefined,
                    'end should be called without params'
                )
            })
        };
        const route = endpoints[endpoint];
        await route(request, response);

    });
    await t.todo('it should call /heroes:post route');
});