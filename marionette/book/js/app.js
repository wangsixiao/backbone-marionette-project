define(['collections/TodoList','views/Header'],function(vent,TodoList,Header){
	'use strict';
	// Application
	var app = new Marionette.Application();
	// var todoList = new TodoList();
	// Model
	var listModel = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false,
		},
	});
	// Collection
	var TodoList = Backbone.Collection.extend({
		model: listModel,
	});
	// addRegions
	app.addRegions({
		header: "#header",
		main: "#main",
		footer: "#footer"
	});
	var todoItemView = Marionette.ItemView.extend({
		template: "#todoItem"
	});
	var todoList = new TodoList();
	app.addInitializer(function(){
		var viewOptions = {
			collection : todoList
		};
		app.header.show(new todoItemView(viewOptions));
	});
	app.start();
});