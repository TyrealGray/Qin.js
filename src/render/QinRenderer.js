//@flow

type RendererProps = {
	canvasElement: HTMLCanvasElement,
};
export default class QinRenderer {
	_canvas: HTMLCanvasElement;

	constructor(props: RendererProps) {
		this._canvas = props.canvasElement;
	}

	render() {}
}
