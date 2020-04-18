import { storeInfo } from './storeInfo';
import { characterInfo,characterInfoContent } from './characterInfo';
import { terrainInfo, terrainInfoContent } from './terrainInfo';
import { gameInfo, gameInfoContent } from './gameInfo';
import { eventTimeInfo,eventTimeInfoContent } from './eventTimeInfo';

const reducers = {
	gameInfo,
	characterInfo,
	storeInfo,
	terrainInfo,
	eventTimeInfo,
};

const shouContent = {
	...characterInfoContent,
	...terrainInfoContent,
	...gameInfoContent,
	...eventTimeInfoContent,
};

export { reducers, shouContent };
