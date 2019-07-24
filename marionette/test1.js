$(function(){
// 1、渲染模板	
	Myview = Backbone.Marionette.ItemView.extend({
		template: "#my_template",
		templateHelpers: {
			showMessage: function(){
				return this.name + "welcom!"
			}
		}
	});

	// debugger
	MyApp = new Backbone.Marionette.Application();
	// 创建Region对象 提供了jQuery选择器 指明管理的元素 
	// 在那个元素内显示backbone view
	MyApp.addRegions({
		container: "#container"
	});
	MyApp.addInitializer(function(){
		var model = new Backbone.Model({
			name: 'qwe'
		});
		view = new Myview({
			model: model
		});
		MyApp.container.show(view);
	});
	MyApp.start();


// 2、CollectionView
	ItemView = Backbone.Marionette.ItemView.extend({
		initialize: function(options){
			console.log(options.foo);
		}
	});
	CollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: ItemView,
		itemViewOptions: {
			foo: 'asd'
		}
	});
	MyCollectionVie = new Backbone.Marionette.Application();
	MyCollectionVie.addRegions({

	});
	MyCollectionVie.addInitializer(function(){
		var model = new Backbone.Model({});
		var view = new CollectionView({
			model: model
		})
	});
	MyCollectionVie.start();

})