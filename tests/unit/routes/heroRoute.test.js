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

    ////////////////////////////////////////////////////////////////////////
    await t.test('it should call /heroes/{id}:get route', async () => {
        const databaseMock = [
            {
                "id": "7ab75790-507d-4612-bb69-70cf72195795",
                "name": "Batman",
                "age": 50,
                "power": "rich"
            }, 
            {
                "id": "47d7d5a6-ffbe-42e5-b5f0-e8c1f6668d64",
                "name": "Nemo",
                "age": 6,
                "power": "come home"
            }
        ]; 

        const heroServiceStub = {
            find: async (id) => {
                let heroSearched = undefined;
                for(let i = 0, length = databaseMock.length; i < length; i++) {
                    if (id === databaseMock[i].id) {
                        databaseMock[i];
                    }
                } 
            }
        };
    
        const endpoints = routes({
            heroService: heroServiceStub
        });

        const endpoint = '/heroes/47d7d5a6-ffbe-42e5-b5f0-e8c1f6668d64:get';
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
        const route = endpoints[endpoint]; // ??
        await route(request, response);

    });
});