<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf8">
		<title>花名册系统</title>
		<script type="text/javascript" src="js/jquery-1.6.4.min.js"></script>
		<link rel="stylesheet" href="css/style.css" />
		<script type="text/javascript">
			var cur_t=null;
			function selectClass(){
				cur_t.class_id=$('#classes').val();
				cur_t.class_name=$.trim($('#classes').text());
			}
			function enterClass(){
				window.location.href="index.php?classid="+cur_t.class_id;
			}
			$(function(){
				$('#loginBtn').click(function(){
					var email=$('#txtEmail').val();
					var pass=$('#txtPassword').val();
					if(email==''|| pass ==''){
						alert("不能为空.");
						return;
					}
					$("#loginBtn").val("正在登陆...").attr("disabled",true);
					
					$.post('action.php',{'action':'login','email':email,'password':pass},function(rtn){
						if(rtn.status=='success'){
							$('#loginDlg').hide();
							$('#welDlg').show();
							$('tname').html(rtn.name);
							for(var i=0;i<rtn.classes.length;i++){
								var c=rtn.classes[i];
								$('#classes').append("<option value='"+c.id+"'>"+c.name+"</option>");
							}
							cur_t=rtn;
							selectClass();
						}else{
							alert("登陆失败.");
						}
						$("#loginBtn").val("登陆").attr("disabled",false);
					},'json');
				})
			});
		</script>
	</head>
	<body>
		<div class="main">
			<h1>花名册系统</h1>
			<div id="loginDlg">
				<p>系统登陆</p>
				<div>
					<label>邮箱：</label><input id='txtEmail' value="fgh@xxx.com" />
				</div>
				<div>
					<label>密码：</label><input id='txtPassword' type="password" value="123456"/>
				</div>
				<div>
					<input type="button" value="登陆" id="loginBtn" />
				</div>
			</div>
			<div id="welDlg">
				<p>登陆成功，欢迎<span id='tname'>冯桂焕</span>老师</p>
				<p>请先选择当前课堂</p>
				<div>
					<select id="classes" onchange="selectClass();">
					</select>
				</div>
				<input type="button" value="进入课堂" onclick="enterClass();" />
			</div>
		</div>
	</body>
</html>