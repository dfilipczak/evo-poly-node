process.argv.push('--config=test')

import * as utils from './Utils';

describe('Utils', ()=> {
    it('should be able to sustain a sequence', ()=>{
        let seq1 = [null, '...', 1, null, 2, '...'];
        let sus1 = utils.sustain(seq1);
        expect(sus1).toEqual([ null, '...', 1, 1, 2, 2 ]);
    })

    it('should be able to validate a config', () => {
        const badConfig = {
            meter: {
                numerator: 7,
                denominator: 8,
                weights: [0, 1, 2, 3, 4, 5]
            },
            elitism: 0,
            populationSize: 0,
            ambitus: 12,
            ranges: [0, 1, 2, 3],
            mutationRate: 0.5,

        }
        expect(() => utils.validateConfig(badConfig)).toThrow();
        const goodConfig = {
            ...badConfig,
            meter: {
                ...badConfig.meter,
                numerator: 6,
            }
        }
        expect(() => utils.validateConfig(goodConfig)).not.toThrow();
    })

    it('should be able to extract notes from a sequence', () => {
        let seq = [null, '...', 60, 72, '...', 90];
        expect(utils.notes(seq)).toEqual([60, 72, 90]);
    })

    it('should be able to convert a pitch space interval to an interval object', () => {
        expect(utils.psToInterval(3)).toEqual({ prefix: 3, suffix: 'minor' })
        expect(utils.psToInterval(12)).toEqual({ prefix: 8, suffix: 'perfect' })
        expect(utils.psToInterval(25)).toEqual({ prefix: 16, suffix: 'minor' })
        expect(utils.psToInterval(23)).toEqual({ prefix: 14, suffix: 'major' })

        const prefixes = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
        prefixes.forEach((prefix, i) => {
            expect(utils.psToInterval(i).prefix).toEqual(prefix);
        })
    })
})