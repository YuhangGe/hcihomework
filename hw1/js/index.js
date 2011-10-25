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

function begin_diandao(type,num) {
	var d = new Date();
	var date = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate();
	
	$.post('action.php', {
		'action' : 'record',
		'classid' : cur_t.class_id,
		'type' : '1',
		'date' : date
	}, function(rtn) {
		if(rtn.status == 'success') {
			$.log("diandao_id:"+rtn.id);
			cur_t.diandao_id = rtn.id;
			bad_stu.length = 0;
			
			do_diandao(type,num);
			
			$('#i_tname').html(cur_t.name);
			$('#i_cname').html(cur_t.class_name);
			$('#finish_dian').html("完成点名");
			$('#c_Person .ctrl').removeMask();
			$('#p_Person').show().ScrollTo(600);
		} else {
			
			alert("出现错误！");
			$('#c_Func').removeMask();
		}
		$('#beginDD').val("开始点到").attr("disabled", false);
	}, 'json');
}

function do_diandao(type,tag) {
	if(type === 'all'){
		check_stu = students;
		$('#t_Person span').html("全部点到");
	}
		
	else if(type==='rand'){
		
		$('#t_Person span').html("随机点到");
		check_stu = get_rand_students(tag);
	}else if(type==='view'){
		check_stu=tag;
	}
		
	cur_page = 1;
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
		render_student(i,0);
	}
	$('#c_PList').append($("<div class='clear'>"));
	if(cur_page === max_page)
		$('#next_page').addClass("disable");
	else
		$('#next_page').removeClass("disable");
	if(cur_page === 1)
		$('#prev_page').addClass("disable");
	else
		$('#prev_page').removeClass("disable");

}

function render_student(index,type) {
	//$.log(index);
	var stu = check_stu[index];
	var n_div=$('<div class="person">');
	n_div.html("<img src='image/" + stu.num + ".png'></img><p>" + stu.name + "</p><p>" + stu.num 
		+ "</p><div class=\"p_mask\"></div><div class=\"p_tip\">缺席</div>")
	.appendTo('#c_PList');
	if(bad_stu[index]===true){
		n_div.find(".p_mask").show();
		n_div.find(".p_tip").show();
	}
	if(type===0){
		n_div.click(function(){
			if(bad_stu[index]===true){
				$(this).find(".p_mask").hide();
				$(this).find(".p_tip").hide();
				bad_stu[index]=false;
			}else{
				$(this).find(".p_mask").show();
				$(this).find(".p_tip").show();
				bad_stu[index]=true;
			}
		});
	}else{
		
	}
}


function goto_next_page() {
	if(cur_page + 1 <= max_page) {
		cur_page++;
		render_page();
	}

}

function goto_prev_page() {
	if(cur_page > 1) {
		cur_page--;
		render_page();
	}
}

function finish_diandao() {
	var bad_id = [];
	for(var i = 0; i < bad_stu.length; i++) {
		if(bad_stu[i] === true)
			bad_id.push(check_stu[i].id);
	}
	$.post("action.php", {
		'action' : 'diandao',
		'badid[]' : bad_id,
		'rid' : cur_t.diandao_id
	}, function(rtn) {
		alert("已经完成点名。");
	}, 'json');
}

$(function() {
	$('#loginBtn').click(login_event);
	$('#radio_1').attr('checked',false).change(function(){
		radio_event(1);
	});
	$('#radio_2').attr('checked',false).change(function(){
		radio_event(2);
	});
	$('#t_pnum').change(function(){
		txt_event(1);	
	});
	$('#t_pbfb').change(function(){
		txt_event(2);	
	});
	$('#btn_dian').click(function(){
		var num=0;
		if($('#radio_1').attr('checked')!=false){
			num=Number($('#t_pnum').val());
		}else{
			n_val=Math.floor(Number($('#t_pbfb').val())/100*students.length);
		}
		if(!num){
			alert('输入错误');
		}else{
			$('#c_Set').mask('#F8FBFD');
			begin_diandao("rand",num);
		}
	});
	
	
	$('#prev_page').click(goto_prev_page);
	$('#next_page').click(goto_next_page);
	$('#finish_dian').click(finish_diandao);
	$('#t_date').attr("readonly",true).datepick();
});

function txt_event(id){
	$.log(id);
	var n_str,n_val;
	if(id===1){
		n_str=$('#t_pnum').val();
		n_val=Number(n_str);
	}else{
		n_str=$('#t_pbfb').val();
		n_val=Math.floor(Number(n_str)/100*students.length);
	}
	$('#s_num2').html(n_val);
}
function radio_event(id){
	$.log(id);
	if(id===2){
		$('#s_item_1 .s_mask').show();
		$('#s_item_2 .s_mask').hide();
		$('#radio_1').attr("checked",false);
	}else{
		$('#s_item_2 .s_mask').show();
		$('#s_item_1 .s_mask').hide();
		$('#radio_2').attr("checked",false);
	}
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
				(function(){
					var cc=c;
					$('<div class="class_div">').html('<h4 class="c_title">'+c.name+'</h4>')
					.appendTo('#c_Class').click(function(){
						goto_class(cc.id,cc.name);
					});
				})();//利用闭包。。。
				
				
			}
			$('<div class="clear">').appendTo('#c_Class');
			cur_t = rtn;
			$('#p_Class').show().ScrollTo(600);
			$('#c_Login').mask('#F8FBFD');
			$('#t_Login a').show().click(event_logout);
			$("#loginBtn").val("已登陆");
		} else {
			alert("登陆失败.");
			$("#loginBtn").val("登陆");
		}
		$("#loginBtn").attr("disabled", false);
	}, 'json');
}



function event_logout(){
	$.post('action.php', {
		'action' : 'logout',
	}, function(rtn) {
		location.reload();
	},'json');
}

function goto_class(cid,cname){
$.log(cname);
	cur_t.class_id=cid;
	cur_t.class_name=cname;
	$('#t_Func a').html("返回上一步").click();
	$('#p_Func').show().ScrollTo(600);
	$('#c_Class').mask('#F8FBFD');
}

function goto_dian_all(){
	$('#c_Func').mask('#F8FBFD');
	begin_diandao("all");
	
}

function goto_dian_rnd(){
	$('#c_Func').mask('#F8FBFD');
	$('#s_num').html(students.length);
	$('#s_num2').html('0');
	$('#s_item_1 .s_mask').hide();
	$('#s_item_2 .s_mask').show();
	$('#radio_1').attr("checked",true);
	$('#radio_2').attr("checked",false);
	$('#p_Set').show().ScrollTo(600);
	
}


function goto_view(){
	var d=new Date();
	var today=d.getFullYear()+"-"+(d.getMonth()+1)+'-'+d.getDate();
	$('#t_date').val(today);
	$('#info_date').show();
	$('#t_Person span').html("查看点到记录");
	$('#finish_dian').html("修改点名");
	$('#p_Person .ctrl').mask();
	$('#p_Person').show().ScrollTo(600);
	show_date_view(today);
	//$('#finish_dian').html("修改点名").click(finish_diandao);
}

function goto_date_view(){
	var d=$('#t_date').val();
	show_date_view(d);
}

function show_date_view(date){
	$('#c_PList').html("<p class='p_load'>正在加载"+date+"的点到记录...</p>");
	$.post('action.php', {
		'action' : 'view',
		'classid' : cur_t.class_id,
		'type': '1',
		'date' : date
	}, function(rtn) {
		if(rtn.status == 'success') {
			cur_t.diandao_id=rtn.id;
			show_view(rtn.bad_id);
		}else{
			$('#c_PList').html("<p class='p_load'>没有缺席的学生记录</p>");
		}
	},'json');
}

function show_view(bad_id){
	if(bad_id.length===0){
		$.log("no");
		$('#c_PList').html("<p class='p_load'>没有缺席的学生记录</p>");
		$('#c_Person .ctrl').mask();
		return;
	}
	var bad_tmp=[];
	bad_stu.length=0;
	for(var i=0;i<students.length;i++){
		if(bad_id.indexOf(students[i].id)!==-1){
			bad_tmp.push(students[i]);
			bad_stu.push(true);
		}
			
	}
	do_diandao("view",bad_tmp);
	$('#c_Person .ctrl').removeMask();
}
