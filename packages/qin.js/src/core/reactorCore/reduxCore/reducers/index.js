import { storeInfo } from './storeInfo';
import { characterInfo } from './characterInfo';
import { terrainInfo, terrainInfoContent } from './terrainInfo';
import { gameInfo, gameInfoContent } from './gameInfo';

const reducers = {
	gameInfo,
	characterInfo,
	storeInfo,
	terrainInfo,
};

const shouContent = {
	...terrainInfoContent,
	...gameInfoContent,
};

export { reducers, shouContent };
