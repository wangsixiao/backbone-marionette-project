$(function(){
	// Application
	var app = new Marionette.Application();
	// addRegions
	app.addRegions({
		header: "#header",
		main: "#main",
		footer: "footer"
	});
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

	// header ItemView
	 headerItemView = Marionette.ItemView.extend({
	 	template: "#list-header",
	 	ui: {
	 		input: "#new-todo"
	 	},
	 	events: {
	 		"keypress #new-todo" : "onInputKeypress"
	 	},
	 	
	 	onInputKeypress: function(e){
	 		// var todoText = this.$("#new-todo")[0].value;
	 		var todoText = this.ui.input[0].value;
	 		if(e.which === 13 && todoText){
	 			this.collection.add({
	 				title: todoText
	 			});
	 			this.ui.input.val('');
	 		}
	 	}
	 });
	 // footer Layout
	 footerLayout = Marionette.Layout.extend({
	 	template: "#list-footer",
	 	regions: {
	 		count: "#todo-count strong"
	 	},
	 	onRender: function(){
	 		this.count.show(new activeCount({collection: this.collection}));
	 	}
	 });
	 //  span
	activeCount = Marionette.View.extend({
		tagName: "span",
		initialize: function(){
			this.listenTo(this.collection,"all",function(){
				count = this.collection.where({completed: false}).length;
			 	this.$el.html(count);
				this.render();
			});
		},
		// render: function(){
		// 	count = this.collection.where({completed: false}).length;
		// 	this.$el.html(count);
		// }
	})
	// todoItemView li
	liItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: "#todoItemView",
		events: {
	 		"click .toggle" : "toggle",
	 		"click .destroy" : "destroy",
	 		"dblclick .view" : "modify",
	 		"keypress .edit" : "modifyEdit",
	 		"blur .edit" : "close"
	 	},
	 	// checkbox checked
	 	toggle: function(){
	 		this.model.set({completed:!this.model.get("completed")});
	 		if(this.model.get("completed") === true){
	 			this.$el.addClass("completed");
	 		}else{
	 			this.$el.removeClass("completed");
	 		}
	 	},
	 	// 删除li
	 	destroy: function(){
	 		this.model.destroy();
	 	},
	 	// 双击li 修改内容
	 	modify: function(){
	 		this.$el.addClass("editing");
	 	},
	 	modifyEdit: function(e){
	 		if(e.keyCode != 13) return;
	 		// if(!this.$(".edit")[0].value) return; 
	 		this.$el.removeClass("editing");
	 		this.model.set({title: this.$(".edit")[0].value});
	 	},
	 	close: function(){
	 		this.$el.removeClass("editing");
	 		console.log(this.model);
	 		this.model.set({title: this.$(".edit")[0].value});
	 	},
	 	initialize: function() {
	 		this.listenTo(this.model,'change', this.render)
	 	}
	});

	// CompositeView ul
	ulCompositeView = Marionette.CompositeView.extend({
	 	template: "#list-compositeView",
	 	itemView: liItemView,
	 	itemViewContainer: "#todo-list",
	});

	// new Collection
	var todoList = new TodoList();
	app.addInitializer(function(){
		var viewOptions = {
			collection: todoList
		};
		app.header.show(new headerItemView(viewOptions));
		app.main.show(new ulCompositeView(viewOptions));
		app.footer.show(new footerLayout(viewOptions));
	});
	app.start();
	// Backbone.history.start();
})