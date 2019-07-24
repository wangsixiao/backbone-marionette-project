$(function(){
	// model
	var Todo = Backbone.Model.extend({
		// 设置默认值
		defaults: function() {
	      return {
	        title: "empty todo...",
	        done: false
	      };
	    }
	   
	});

// collection
	  var TodoList = Backbone.Collection.extend({
		// model为Todo
	    model: Todo,

	    done: function() {
	      return this.where({done: true});
	    },

	    remaining: function() {
	      return this.where({done: false});
	    },

	  });
	// 创建一个collection的实例
	  var Todos = new TodoList;

	// view1
	var TodoView = Backbone.View.extend({
		// 根元素为li
	    tagName:  "li",
	    // 模板
	    template: _.template($('#add-todo').html()),
	    // 触发的事件
	    events: {
	      "click #item"   : "toggleDone",
	      "dblclick #view" : "modify",
	      "keypress #modify" : "blurEvent",
	      "click #destroy" : "destroy"
	    },
	    // 初始化函数
	    initialize: function() {
	    // 监听model改变时 触发的事件
	      this.listenTo(this.model, 'change', this.render);
	      this.listenTo(this.model, 'destroy', this.remove);
	    },

	    render: function() {
	      this.$el.html(this.template(this.model.toJSON()));
	      this.$el.toggleClass('pitchon', this.model.get('done'));
	      this.input = this.$("#modify");
	      return this;
	    },
	    // 添加的多选按钮点击时触发事件实现
	    toggleDone: function() {
	    // 设置done的值 true和false切换
	      this.model.set({done: !this.model.get("done")});
	      // 判断done的状态 添加删除删除线样式
	      if(this.model.get("done") == true){
	      	this.$el.addClass("pitchon");
	      }else{
	      	this.$el.removeClass("pitchon");
	      }
	      
	    },
	    // 双击li修改内容
	    modify: function(){
	    	this.$el.addClass("edit");
	    },
	    // 修改的input失去焦点后触发的事件
	    blurEvent: function(e){
	    	if(e.keyCode != 13) return;
	    	if(!this.input.val()) return;
	    	this.$el.removeClass("edit");
	    	// 修改model里title的值
	    	console.log(this.model.get("title"));
	    	this.model.set({title:this.input.val()});

	    },
	    // 删除li
	    destroy: function(){
	    	this.model.destroy();
	    }

  	});

// view2
	var AppView = Backbone.View.extend({
	    // 根元素
	    el: $("#todoapp"),
	    // 计算数量的模板
	    calTemplate: _.template($("#cal-amount").html()),
	 	// 事件
	    events: {
	      "keypress #new-todo":  "createOnEnter",
	    
	    },

	    initialize: function() {

	      this.input = this.$("#new-todo");
	      this.footer = this.$('footer');

	      this.listenTo(Todos, 'add', this.addOne);
	      this.listenTo(Todos, 'all', this.render);

	    },

	    render: function() {
	      var done = Todos.done().length;
	      var remaining = Todos.remaining().length;
	      // 将计算数量的模板插入到footer元素中
	      this.footer.html(this.calTemplate({done:done,remaining:remaining})); 
	    },

	    addOne: function(todo) {
	      var view = new TodoView({model: todo});
	      // 给ul添加li
	      this.$("#todo-list").append(view.render().el);
	    },
	   
	    // 当input输入数据点击enter触发的事件实现
	    createOnEnter: function(e) {
	      if (e.keyCode != 13) return;
	      if (!this.input.val()) return;
	      // 设置title值为输入的值 监听事件add
	      Todos.add({title:this.input.val()});
	      this.input.val('');
	    }

	    
	});

  var App = new AppView;
})