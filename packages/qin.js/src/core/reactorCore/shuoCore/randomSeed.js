//@flow
import { monotonicFactory } from 'ulid';

/**
 * a class for managing seed string and randomize game, RandomSeed is a singleton when import it
 */
class RandomSeed {

	_seed: string;
	_seedNumber: number;

	/**
	 * constructor is a private function, no access from outside
	 */
	constructor(){
		const ulid = monotonicFactory();
		this._seed = ulid();
		this._createSeedNumber(this._seed);
	}

	_createSeedNumber(seed: string): void {
		let number = 0;
		for(const seedCharacter of seed) {
			number += seedCharacter.charCodeAt(0);
		}

		this._seedNumber = number;
	}

	_setSeedNumber(seed: number): void {
		this._seedNumber = seed;
	}

	/**
	 * get the number which converts from seed string
	 * @returns {number}
	 */
	getSeedNumber(): number {
		return this._seedNumber;
	}

	/**
	 * get seed string
	 * @returns {string}
	 */
	getSeed(): string {
		return this._seed;
	}

	/**
	 * set new seed to the instance
	 * @param seed {string} seed string
	 */
	setSeed(seed: string) {
		this._seed = seed;
		this._createSeedNumber(seed);
	}

	/**
	 * get random number by using seed
	 * @param min {number} minimum of the random will return
	 * @param max {number} maximum of the random will return
	 * @returns {number}
	 */
	random(min: number, max: number): number{
		let _max = max ?? 1;
		let _min = min ?? 0;

		if(_min > _max){
			const temp = _max;
			_max = _min;
			_min = temp;
		}

		this._seedNumber = (this._seedNumber * 9301 + 49297) % 233280;
		let rnd = this._seedNumber / 233280.0;

		return _min + rnd * (_max - _min);
	}
}

const instance = new RandomSeed();

Object.freeze(instance);

export default instance;