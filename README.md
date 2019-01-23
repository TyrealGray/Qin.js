<p align="center"><img height="100px" width="100px" src="https://raw.githubusercontent.com/TyrealGray/Qin.js/master/qin.png"></p>

# Qin.js
A gaming sandbox engine written in JavaScript

### Using remoteredux-standalone to debug
Because Qin.js is based on redux framework, so every event could be debugging on [remoteredux-standalone](https://github.com/TyrealGray/remoteredux-standalone)
* install remoteredux-standalone globally and run `remoteredux --port=9009` in terminal
* use `isDebugRedux: true` when create Qin Object: `new qinjs.Qin({isDebugRedux: true});` and you should see events are showing in monitor 
