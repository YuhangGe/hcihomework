check_stu = null;
bad_stu = [];
//没有来上课的学生在check_stu中的索引
PAGE_NUM = 10;
max_page = 0;
cur_page = 0;
var cur_t=null;//当前老师
function get_rand_students(num) {
	if(num > students.length)
		return students;
	var count = 0, max = students.length, i = 0, tmp = {}, rtn = [];
	while(count < num) {
		i = Math.floor(Math.random() * max);
		if(tmp[i] !== true) {
			rtn.push(students[i]);
			tmp[i] = true;
			count++;
		}
	}
	return rtn;
}

function diandao(type) {
	if(teacher.diandao_id != null) {
		do_diandao(type);
		return;
	}
	var d = new Date();
	var date = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
	$('#beginDD').val("正在初始化...").attr("disabled", true);
	$.post('action.php', {
		'action' : 'record',
		'classid' : teacher.class_id,
		'type' : '1',
		'date' : date
	}, function(rtn) {
		if(rtn.status == 'success') {
			$('#tip').hide();
			$('#panel').show();
			$('#ctrl').show();
			teacher.diandao_id = rtn.id;
			do_diandao(type);
		} else {
			alert("出现错误！");
		}
		$('#beginDD').val("开始点到").attr("disabled", false);
	}, 'json');
}

function do_diandao(type) {
	if(type === 'all')
		check_stu = students;
	else
		check_stu = get_rand_students(Math.floor(students.length * 0.7));
	cur_page = 1;
	bad_stu.length = 0;
	var len = check_stu.length;
	if(len % PAGE_NUM === 0)
		max_page = len / PAGE_NUM;
	else
		max_page = Math.floor(len / PAGE_NUM) + 1;
	render_page();
}

function render_page() {
	$('#c_PList').html('');
	var from, to;
	if(cur_page * PAGE_NUM <= check_stu.length) {
		to = cur_page * PAGE_NUM - 1;
		from = to - PAGE_NUM + 1;
	} else {
		to = check_stu.length - 1;
		from = (cur_page - 1) * PAGE_NUM;
	}
	for(var i = from; i <= to; i++) {
		renderStudent(i,0);
	}
	$('#c_PList').append($("<div class='clear'>"));
	if(cur_page === max_page)
		$('#next_page').addClass("disable");
	else
		$('#next_page').removeMask();
	if(cur_page === 1)
		$('#prev_page').addClass("disable");
	else
		$('#prev_page').removeMask();

}

function renderStudent(index,type) {
	$.log(index);
	var stu = check_stu[index];
	var n_div=$('<div class="person">');
	n_div.html("<img src='image/" + stu.num + ".png'></img><p>" + stu.name + "</p><p>" + stu.num + "</p>")
	.appendTo('#c_PList');
	if(bad_stu[index]===true){
		n_div.mask("gray",0.7);
	}
	if(type===0){
		n_div.click(function(){
			this.mask();
		});
	}
}

function setBad(index) {
	if(bad_stu[index] === true) {
		bad_stu[index] = false;
		$('#stu-' + index).attr("checked", false);
	} else {
		bad_stu[index] = true;
		$('#stu-' + index).attr("checked", true);
	}
}

function next_page() {
	if(cur_page + 1 <= max_page) {
		cur_page++;
		renderPage();
	}

}

function pre_page() {
	if(cur_page > 1) {
		cur_page--;
		renderPage();
	}
}

function finishDiandao() {
	var bad_id = [];
	for(var i = 0; i < bad_stu.length; i++) {
		if(bad_stu[i] === true)
			bad_id.push(check_stu[i].id);
	}
	$.post("action.php", {
		'action' : 'diandao',
		'badid[]' : bad_id,
		'rid' : teacher.diandao_id
	}, function(rtn) {
		alert("已经完成点名。");
	}, 'json');
}

$(function() {
	event_init();
	$('#popDate').datepick({
		dateFormat : 'yyyy-mm-dd'
	});
})
function event_init() {
	$('#loginBtn').click(login_event);
}

function login_event(argument) {
	var email = $('#txtEmail').val();
	var pass = $('#txtPassword').val();
	if(email == '' || pass == '') {
		alert("不能为空.");
		return;
	}
	$("#loginBtn").val("正在登陆...").attr("disabled", true);

	$.post('action.php', {
		'action' : 'login',
		'email' : email,
		'password' : pass
	}, function(rtn) {
		if(rtn.status == 'success') {
			$('#t_Login a').html(rtn.name+"，登出");
			$('#c_Class').html('');
			for(var i = 0; i < rtn.classes.length; i++) {
				var c = rtn.classes[i];
				$('<div class="class_div">').html('<h4 class="c_title">'+c.name+'</h4>')
					.appendTo('#c_Class').click(function(){
						goto_class(c.id,c.name);
					});
			}
			$('<div class="clear">').appendTo('#c_Class');
			cur_t = rtn;
			$('#p_Class').show().ScrollTo(1000);
			$('#c_Login').mask('#F8FBFD');
			$('#t_Login a').show().click(event_logout);
		} else {
			alert("登陆失败.");
		}
		$("#loginBtn").val("登陆").attr("disabled", false);
	}, 'json');
}

function after_login(){
	
}

function event_logout(){
	
}

function goto_class(cid,cname){
	cur_t.class_id=cid;
	cur_t.class_name=cname;
	$('#t_Func a').html("返回上一步").click();
	$('#p_Func').show().ScrollTo(600);
	$('#c_Class').mask('#F8FBFD');
}

function goto_dian_all(){
	$('#t_Person span').html("全部点到");
	$('#i_tname').html(cur_t.name);
	$('#i_cname').html(cur_t.class_name);
	do_diandao('all');
	$('#p_Person').show().ScrollTo(600);
	$('#c_Func').mask('#F8FBFD');
}


