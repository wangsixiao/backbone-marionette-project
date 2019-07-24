$(function(){
	$("#todo-count span").text($("#todo-list li").length);
	// 添加新的li元素
	$("#new-todo").keypress(function(e){
		if(e.keyCode == 13){
			var a = $("#todo-list li").length;
		var newtodo = $("#new-todo").val();
		$("#todo-list").append(`
			<li>
				<div class="view">
					<input type="checkbox" class="toggle" name="todos" value="todo3">
					<label>${newtodo}</label>
				</div>
			</li>
		`);
		$("#new-todo").val('');
		a++;
		$("#todo-count span").text(a);
		// 设置多选删除样式
		var sum = 0;
		$(document).on("click",".toggle",function(){
			if($(this).is(":checked") == true){
				$(this).attr("checked","checked");
				$(this).next().addClass("done");
				++sum;
			}else{
				$(this).removeAttr("checked");
				$(this).next().removeClass("done");
				--sum;
			}
			$("#clear-complete span").text(sum);
			$("#todo-count span").text(a-sum);
		})
		}

	});

})