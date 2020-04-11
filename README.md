<p align="center"><img height="100px" width="100px" src="https://raw.githubusercontent.com/TyrealGray/Qin.js/master/qin.png"></p>

# Qin.js
[![Maintainability](https://api.codeclimate.com/v1/badges/1821d05332d3649f6a02/maintainability)](https://codeclimate.com/github/TyrealGray/Qin.js/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1821d05332d3649f6a02/test_coverage)](https://codeclimate.com/github/TyrealGray/Qin.js/test_coverage)
[![Build Status](https://travis-ci.com/TyrealGray/Qin.js.svg?branch=master)](https://travis-ci.com/TyrealGray/Qin.js) 

A gaming sandbox engine written in Redux

### Using remoteredux-standalone to debug
Because Qin.js is based on redux framework, so every event could be debugging on [remoteredux-standalone](https://github.com/TyrealGray/remoteredux-standalone)
* install remoteredux-standalone globally and run `remoteredux --port=9009` in terminal
* use `debugging: true` when create Qin Object: `new qinjs.Qin({debugging: true});` and you should see events are showing in monitor 
