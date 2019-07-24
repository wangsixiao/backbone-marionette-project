define(function(require){
	"use strict";
	return {
		header: require('tpl!templates/header.tmpl'),
		footer: require('tpl!templates/footer.tmpl'),
		todoItemView: require('tpl!templates/todoItemView.tmpl'),
		todoCompositeView: require("tpl!templates/todoListCompositeView.tmpl")
	}
})