// @flow

import type {
	AnimationAssetType,
	NoneAnimationAssetType,
} from '../static/Animation';

type ActorPropsType = {
	onClick: (...args: any) => void,
	position: { x: number, y: number },
	assetsData: AnimationAssetType | NoneAnimationAssetType,
};

/**
 * class for rendering every actor at scene
 */
class QinActor {
	constructor(props: ActorPropsType) {}

	render(): void {}
}

export default QinActor;
