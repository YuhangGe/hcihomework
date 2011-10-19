check_stu=null;
bad_stu=[]; //没有来上课的学生在check_stu中的索引
PAGE_NUM=9;
max_page=0;
cur_page=0;
function get_rand_students(num){
	if(num>students.length)
		return students;
	var count=0,max=students.length,i=0,tmp={},rtn=[];
	while(count<num){
		i=Math.floor(Math.random()*max);
		if(tmp[i]!==true){
			rtn.push(students[i]);
			tmp[i]=true;
			count++;
		}
	}
	return rtn;
}
function diandao(type){
	if(teacher.diandao_id!=null){
		do_diandao(type);
		return;
	}
	var d=new Date();
	var date=d.getFullYear()+"-"+(d.getMonth()+1)+'-'+d.getDate();
	$('#beginDD').val("正在初始化...").attr("disabled",true);
	$.post('action.php',{'action':'record','classid':teacher.class_id,'type':'1','date':date},function(rtn){
		if(rtn.status=='success'){
			$('#tip').hide();
			$('#panel').show();
			$('#ctrl').show();
			teacher.diandao_id=rtn.id;
			do_diandao(type);
		}else{
			alert("出现错误！");
		}
		$('#beginDD').val("开始点到").attr("disabled",false);
	},'json');
	
}

function do_diandao(type){
	if(type==='all')
		check_stu=students;
	else
		check_stu=get_rand_students(Math.floor(students.length*0.7));
	cur_page=1;
	bad_stu.length=0;
	var len=check_stu.length;
	if(len % PAGE_NUM === 0)
		max_page=len / PAGE_NUM;
	else
		max_page=Math.floor(len/PAGE_NUM)+1;
	renderPage();
}
function renderPage(){
	$('#panel').html('');
	var from,to;
	if(cur_page * PAGE_NUM <=check_stu.length){
		to=cur_page*PAGE_NUM-1;
		from=to - PAGE_NUM + 1 ;
	}else{
		to=check_stu.length-1;
		from=(cur_page-1)*PAGE_NUM;
	}
	for(var i=from;i<=to;i++){
		renderStudent(i);
	}
	if(cur_page===max_page)
		$('#next_page').addClass('disable');
	else
		$('#next_page').removeClass('disable');
	if(cur_page===1)
		$('#pre_page').addClass('disable');
	else
		$('#pre_page').removeClass('disable');
	
	
}
function renderStudent(index){
	var stu=check_stu[index];
	var isbad=bad_stu[index]===true?true:false;
	$('<div class="stu">').html("<img src='image/"+stu.num+".png'></img><p>"
		+stu.name+"</p><p>"+stu.num+"</p><p><input type='checkbox' "
		+(isbad===true?'checked':'')+" id='stu-"+index+"' onchange='setBad("+index+");' />标记为未到</p>")
		.appendTo($('#panel'));
}
function setBad(index){
	if(bad_stu[index]===true){
		bad_stu[index]=false;
		$('#stu-'+index).attr("checked",false);
	}else{
		bad_stu[index]=true;
		$('#stu-'+index).attr("checked",true);
	}
}
function next_page(){
	if(cur_page+1<=max_page){
		cur_page++;
		renderPage();
	}
	
}
function pre_page(){
	if(cur_page>1){
		cur_page--;
		renderPage();
	}
}

function finishDiandao(){
	var bad_id=[];
	for(var i=0;i<bad_stu.length;i++){
		if(bad_stu[i]===true)
			bad_id.push(check_stu[i].id);
	}
	$.post("action.php",{'action':'diandao','badid[]':bad_id,'rid':teacher.diandao_id},function(rtn){
		alert("已经完成点名。");
	},'json');
}

function view(){
	
}
