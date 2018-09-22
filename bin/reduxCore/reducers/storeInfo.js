'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.storeInfo = storeInfo;

var _actionTypes = require('../actions/actionTypes');

var initialState = {
	isInit: false
};

function storeInfo() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];


	switch (action.type) {
		case _actionTypes.STORE_INIT:
			return _extends({}, state, {
				isInit: true
			});
		default:
			return state;
	}
}
//# sourceMappingURL=storeInfo.js.map