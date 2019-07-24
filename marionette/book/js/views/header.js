define(['marionette','templates'],function(Marionette,templates){
	'use strict';
	return Marionette.ItemView.extend({
		template: templates.header,
		ui: {
			input: '#new-todo'
		},
		events: {
			'keypress #new-todo' : "onInputKeypress"
		},
		onInputKeypress: function(e){
			var ENTER_KEY = 13;
			var todoText = this.ui.input.val().trim();

			if(e.which === ENTER_KEY && todoText){
				this.collection.add({
					title: todoText
				});
				this.ui.input.val('');
			}
		}
	})
})