//@flow

type RendererProps = {
	canvasElement: HTMLCanvasElement;
}
export default class Renderer {

	_canvas: HTMLCanvasElement;

	constructor(props: RendererProps){
		this._canvas = props.canvasElement;
	}

	render(){

	};
}