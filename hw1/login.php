<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>花名册系统</title>
		<script type="text/javascript" src="js/jquery-1.6.4.min.js"></script>
		<link rel="stylesheet" href="css/style.css" />
		<script type="text/javascript">
			$(function(){
				$('#loginBtn').click(function(){
					
				})
			});
		</script>
	</head>
	<body>
		<div class="main">
			<h1>花名册系统</h1>
			<div>
				<p>系统登陆</p>
				<div>
					<label>邮箱：</label><input value="fgh@xxx.com" />
				</div>
				<div>
					<label>密码：</label><input type="password" value="123456"/>
				</div>
				<div>
					<input type="button" value="登陆" id="loginBtn" />
				</div>
			</div>
			<div>
				<p>登陆成功，欢迎<span>冯桂焕</span>老师</p>
				<p>请先选择当前课堂</p>
				<div>
					<select>
						<option>人机交互</option>
						<option>手写文档</option>
					</select>
				</div>
				<input type="button" value="进入课堂" />
			</div>
		</div>
	</body>
</html>