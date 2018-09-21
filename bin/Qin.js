'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderer = require('./render/renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _pouchdb = require('pouchdb');

var _pouchdb2 = _interopRequireDefault(_pouchdb);

var _storeUtil = require('./reduxCore/storeUtil');

var _storeActions = require('./reduxCore/actions/storeActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Qin = function () {
	function Qin(props) {
		_classCallCheck(this, Qin);

		this._renderer = new _renderer2.default({ canvasElement: props.canvas });

		this._initRedux();

		this._createNewWorld();
	}

	_createClass(Qin, [{
		key: '_createNewWorld',
		value: function _createNewWorld() {
			var db = new _pouchdb2.default('qindb');
			//
			// db.get('dave@gmail.com').then(function (doc) {
			//     console.log(doc);
			// });
			//
			// db.changes().on('change', function() {
			//     console.log('Changes');
			// });
			//
			//db.replicate.to('qin');
		}
	}, {
		key: '_initRedux',
		value: function _initRedux() {
			var _this = this;

			this._store = (0, _storeUtil.initStore)();
			this._store.subscribe(function () {
				return console.log(_this._store.getState());
			});

			this._store.dispatch((0, _storeActions.storeInit)());
		}
	}, {
		key: 'render',
		value: function render() {}
	}]);

	return Qin;
}();

exports.default = Qin;
//# sourceMappingURL=Qin.js.map