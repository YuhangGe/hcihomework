<?php
	include 'common.php';
	session_start();
	if(!isset($_SESSION['tid']) || !isset($_REQUEST['classid'])){
		header("Location:login.php");
		exit();
	}
	$teacher=array(
		'id'=>$_SESSION['tid'],
		'name'=>$_SESSION['tname'],
		'class_id'=>$_REQUEST['classid'],
		'class_name'=>get_class_name($_REQUEST['classid'])
	);
	
?>
<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>花名册系统</title>
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/flora.datepick.css" />
		<script type="text/javascript">
			//在前端存储当前教师信息和学生信息，逻辑全部由前端实现
			var teacher=<?php echo json_encode($teacher);?>;
			var students=<?php echo json_encode(get_all_students());?>;
		</script>
		<script type="text/javascript" src="js/jquery-1.6.4.min.js"></script>
		<script type="text/javascript" src="js/jquery.datepick.min.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
	</head>
	<body>
		<div class="main">
			<div id="header">
				<h1>花名册系统</h1>
				<div style="text-align: left;">
					欢迎您，<span><?php echo $teacher['name'];?></span>老师。当前课堂：<span><?php echo $teacher['class_name'];?></span>
				</div>
			</div>
			<div id="content">
				<div class="col-main">
					<div id="container">
						<div id="panel">
																			
						</div>
						<div id="ctrl">
							<a id="pre_page" href="javascript:pre_page();">上一页</a><a id="next_page" href="javascript:next_page();">下一页</a><a href="javascript:finishDiandao();" >完成点名</a>
						</div>
						<div id="tip">
							<input id="beginDD" type="button" value="开始点到" onclick="diandao_all();"/>
						</div>
					</div>
					<div id="view">
						<h5>查看点到和检查记录</h5>
						<div>选择日期：<input type="text" id="popDate" /><input type="button" value="" /></div>
					</div>
				</div>
				<div class="col-sub">
					<ul>
						<li><a href="javascript:diandao('all');">完整点名</a></li>
						<li><a href="javascript:diandao('rand');">随机点到</a></li>
						<li><a href="javascript:choucha();">作业抽查</a></li>
						<li><a href="javascript:view();">查看记录</a></li>
					</ul>
				</div>
				<div class="clear"></div>
			</div>
			<div id="footer">
				花名册系统 ©2010-2011 221宿舍小组
			</div>
		</div>
	</body>
</html>