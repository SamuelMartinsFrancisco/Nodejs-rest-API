export default class HeroService {
    constructor({
        heroRepository
    }) {
        this.heroRepository = heroRepository;
    };

    find(id) {
       return this.heroRepository.find(id); 
    };

    create(data) {
        return this.heroRepository.create(data);
    };

    update(data, index) {
        return this.heroRepository.update(data, index);
    };
}; 