// @flow
export type AnimationAssetType = {
	IS_CONTAIN_ANIMATION: boolean,
	DATA: Array<{
		TYPE: string,
		NAME: string,
		SPEED: number,
		PATH: string,
	}>,
};
