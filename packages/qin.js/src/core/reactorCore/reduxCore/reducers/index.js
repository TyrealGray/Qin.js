import { storeInfo } from './storeInfo';
import { characterInfo, characterInfoContent } from './characterInfo';
import { npcInfo, npcInfoContent } from './npcInfo';
import { terrainInfo, terrainInfoContent } from './terrainInfo';
import { gameInfo, gameInfoContent } from './gameInfo';
import { eventTimeInfo, eventTimeInfoContent } from './eventTimeInfo';

const reducers = {
	gameInfo,
	characterInfo,
	npcInfo,
	storeInfo,
	terrainInfo,
	eventTimeInfo,
};

const shouContent = {
	...characterInfoContent,
	...terrainInfoContent,
	...npcInfoContent,
	...gameInfoContent,
	...eventTimeInfoContent,
};

export { reducers, shouContent };
