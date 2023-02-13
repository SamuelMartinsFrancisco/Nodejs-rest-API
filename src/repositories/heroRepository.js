import { readFile, writeFile } from 'node:fs/promises';    // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
                                                           // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback
export default class HeroRepository {
    constructor({
        file
    }) {
        this.file = file
    };

    // https://www.javascripttutorial.net/javascript-private-methods/
    async #currentFileContent() {
        return JSON.parse(await readFile(this.file));
    };

    async find(id) {
        if (typeof id === "undefined") { 
            return this.#currentFileContent();
        }
        
        const currentFile = await this.#currentFileContent();
        const matchingFile = () => {
            for(let i = 0, length = currentFile.length; i < length; i++) {
                if (id === currentFile[i].id) {
                    return [currentFile[i], i];
                }
            } 
        }
        
        return matchingFile();
    };

    async create(data) {
        const currentFile = await this.#currentFileContent();
        currentFile.push(data);    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push

        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        );

        return data.id;
    };

    async update(data, index) {
        const currentFile = await this.#currentFileContent();

        currentFile[index] = Object.assign(currentFile[index], data);   // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        
        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        );

        return currentFile[index].name;
    }
};

/*
const heroRepository = new HeroRepository({
    file: './database/data.json'
});

console.log(
    await heroRepository.create({
        id: 2,
        name: 'Chapolin'
    })
);

console.log(
    await heroRepository.find()
);
*/