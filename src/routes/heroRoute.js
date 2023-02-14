import { once } from 'node:events';    // https://nodejs.org/api/events.html#emitteronceeventname-listener 
import Hero from '../entities/hero.js';
import { DEFAULT_HEADER } from '../util/util.js';

const routes = ({
    heroService
}) => ({
    '/heroes:get': async (request, response) => {
        const heroes = await heroService.find(undefined);
        response.writeHead(200);
        response.write(JSON.stringify({ results: heroes }));
        return response.end();
    },

    // https://paramdeo.com/blog/validating-uuids-with-regular-expressions-in-javascript -> Explicação quanto à estrutura da expressão regular do UUID
    [/\/heroes\/([a-z,0-9,-]{36,36}):get/]: async (request, response) => {
        const id = request.url.split("/")[2];
        const [ hero ] = await heroService.find(id);
    
        if (hero === undefined) {
            response.write('Uuuups, hero not found!!');
        } else {
            response.write(JSON.stringify({ result: hero }));
        }
        return response.end();
        // Retorna um objeto vazio quando um ID inexistente é acessado ->  precisa lançar o not found padrão
    },

    '/heroes:post': async (request, response) => {
        const data = await once(request, 'data');
        const item = JSON.parse(data);
        const hero = new Hero(item);
        
        const id = await heroService.create(hero);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({
            id,
            success: 'Hero created with success!!'
        }));

        return response.end();
    }, 
    
    [/\/heroes\/([a-z,0-9,-]{36,36}):patch/]: async (request, response) => {
        const id = request.url.split("/")[2];
        const data = await once(request, 'data');
        const item = JSON.parse(data);
        const [ , index ] = await heroService.find(id);

        const name = await heroService.update(item, index);
        response.writeHead(200, DEFAULT_HEADER);
        response.write(JSON.stringify({
            name,
            id,
            success: 'Hero updated with success!!'
        }));

        return response.end();
    },

    [/\/heroes\/([a-z,0-9,-]{36,36}):delete/]: async (request, response) => {
        const id = request.url.split("/")[2];
        const [ , index ] = await heroService.find(id);

        const name = await heroService.remove(index);
        response.writeHead(200, DEFAULT_HEADER);
        response.write(JSON.stringify({
            name,
            id,
            success: 'Hero removed with success!!'
        }));

        return response.end(); 
    }
});

export {
    routes
};