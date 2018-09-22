'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initStore = initStore;

var _redux = require('redux');

var _remoteReduxDevtools = require('remote-redux-devtools');

var _remoteReduxDevtools2 = _interopRequireDefault(_remoteReduxDevtools);

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initStore() {
	return (0, _redux.createStore)((0, _redux.combineReducers)(reducers), (0, _remoteReduxDevtools2.default)());
}
//# sourceMappingURL=storeUtil.js.map