//@flow
import Renderer from './render/renderer';

class Qin {

	_renderer: Renderer;

    constructor(props){
    	this._renderer = new Renderer({canvasElement: props.canvas});
    }

    render(){
    }
}