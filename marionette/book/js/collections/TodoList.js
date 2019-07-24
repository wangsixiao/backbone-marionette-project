define(['backbone','models/Todo'],function(Backbone,Todo){
	'use strict';
	return Backbone.Collection.extend({
		model: Todo
	})
})