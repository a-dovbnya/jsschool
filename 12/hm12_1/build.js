var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Model = __webpack_require__(1);
	var View = __webpack_require__(2);
	var Controller = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var entry = __webpack_require__(5);


	entry();

	exports.Model = Model;
	exports.View  = View ;
	exports.Controller = Controller;
	exports.Router = Router;



/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	    login: function(appId, perms) {
	        return new Promise(function(resolve, reject) {
	            VK.init({
	                apiId: appId
	            });

	            VK.Auth.login(function(response) {
	                if (response.session) {
	                    resolve(response);
	                } else {
	                    reject(new Error('Не удалось авторизоваться'));
	                }
	            }, perms);
	        });
	    },
	    callApi: function(method, params) {
	        return new Promise(function(resolve, reject) {
	            VK.api(method, params, function(response) {
	                if (response.error) {
	                    reject(new Error(response.error.error_msg));
	                } else {
	                    resolve(response.response);
	                }
	            });
	        });
	    },
	    getUser: function() {
	        return this.callApi('users.get', {});
	    },
	    getMusic: function() {
	        return this.callApi('audio.get', {});
	    },
	    getFriends: function() {
	        return this.callApi('friends.get', { fields: 'photo_100' });
	    },
	    getNews: function() {
	        return this.callApi('newsfeed.get', { filters: 'post', count: 20 });
	    }
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	    render: function(templateName, model) {
	        templateName = templateName + 'Template';

	        var templateElement = document.getElementById(templateName),
	            templateSource = templateElement.innerHTML,
	            renderFn = Handlebars.compile(templateSource);

	        return renderFn(model);
	    }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	    musicRoute: function() {
	        return App.Model.getMusic().then(function(music) {
	            results.innerHTML = App.View.render('music', {list: music});
	        });
	    },
	    friendsRoute: function() {
	        return App.Model.getFriends().then(function(friends) {
	            results.innerHTML = App.View.render('friends', {list: friends});
	        });
	    },
	    newsRoute: function() {
	        return App.Model.getNews().then(function(news) {
	            results.innerHTML = App.View.render('news', {list: news.items});
	        });
	    }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	    handle: function(route) {
	        var routeName = route + 'Route';

	        App.Controller[routeName]();
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(){
	    Handlebars.registerHelper('formatTime', function(time) {
	        var minutes = parseInt(time / 60),
	            seconds = time - minutes * 60;

	        minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
	        seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

	        return minutes + ':' + seconds;
	    });

	    Handlebars.registerHelper('formatDate', function(ts) {
	        return new Date(ts * 1000).toLocaleString();
	    });



	    document.addEventListener('click', function(e){
	        var self = e.target;
	        var id = self.getAttribute('id');

	        if(id == 'music'){
	            App.Router.handle('music')
	        }else if(id == 'friends'){
	            App.Router.handle('friends')
	        }else if(id == 'news'){
	            App.Router.handle('news')
	        }

	    });

	    new Promise(function(resolve) {
	        window.onload = resolve;
	    }).then(function() {
	        return App.Model.login(5267932, 2 | 8 | 8192);
	    }).then(function() {
	        return App.Model.getUser().then(function(users) {
	            header.innerHTML = App.View.render('header', users[0]);
	        });
	    }).catch(function(e) {
	        console.error(e);
	        alert('Ошибка: ' + e.message);
	    });
	}




/***/ }
/******/ ]);