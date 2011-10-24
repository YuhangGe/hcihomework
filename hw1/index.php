<?php
include 'common.php';
?>
<!doctype html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>花名册系统</title>
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/flora.datepick.css" />
		<script type="text/javascript">
			//在前端存储当前学生信息，逻辑全部由前端实现
			var students = 
<?php echo json_encode(get_all_students());?>;</script>
		<script type="text/javascript" src="js/jquery-1.6.4.min.js"></script>
		<script type="text/javascript" src="js/jquery.datepick.min.js"></script>
		<script type="text/javascript" src="js/scroll.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
	</head>
	<body>
		<div class="main">
			<div id="wrap_all">
				<div class="part" id="p_Login">
					<div class="title" id="t_Login">
						<h2><span>系统登陆</span><a href="javacript:;" style="display: none;">风雨换，登出</a></h2>
						<div class="clear"></div>
					</div>
					<div class="content" id="c_Login">
						<div>
							<label>邮箱</label>
							<br/>
							<input id='txtEmail' type="text" value="fgh@xxx.com" />
						</div>
						<div>
							<label>密码</label>
							<br/>
							<input id='txtPassword' type="password" value="123456"/>
						</div>
						<div>
							<input class="big_btn" type="button" value="登陆" id="loginBtn" />
						</div>
					</div>
				</div>
				<div class="part" id="p_Class">
					<div class="title" id="t_Class">
						<h2><span>选择课堂</span><a href="#">返回到此步</a></h2>
					</div>
					<div class="content" id="c_Class">
						<div class="class_div">
							<h4 class="c_title">软件体系结构</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title">软件体系结构</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title">软件体系结构</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title">软件体系结构</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title">软件体系结构</h4>
						</div>
						<div class="clear"></div>
					</div>
				</div>
				<div class="part" id="p_Func">
					<div class="title" id="t_Func">
						<h2><span>选择功能</span><a href="javascript:;">返回上一步</a></h2>
					</div>
					<div class="content" id="c_Func">
						<div class="class_div">
							<h4 class="c_title" onclick="goto_dian_all();">全体点到</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title" onclick="goto_dian_rnd();">随机点到</h4>
						</div>
						<div class="class_div">
							<h4 class="c_title" onclick="goto_view();">查看记录</h4>
						</div>
						<div class="clear"></div>
					</div>
				</div>
				<div class="part" id="p_Person">
					<div class="title" id="t_Person">
						<h2><span>全部点到</span><a href="#">返回上一步</a></h2>
					</div>
					<div class="info" id="i_Person">
						欢迎您，<span id="i_tname">放烟花</span>老师。当前课堂：<span id="i_cname">人机交换</span>
					</div>
					<div class="content" id="c_Person">
						<div id="c_PList">
							<div class="person">
								<img src="image/081251001.png" />
								<p>
									王小扬
								</p>
								<p>
									081251041
								</p>
							</div>
							
							<div class="clear"></div>
						</div>
						<div class="ctrl">
							<div class="little_btn" id="finish_dian">完成点名</div>
							<div class="little_btn" id="prev_page">下一页</div>
							<div class="little_btn" id="next_page">上一页</div>
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</div>
			<!--			<div id="content">
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
			</div> -->
			<div id="footer">
				<h2>花名册系统</h2>
				<p>
					Copyright 221-Team
				</p>
			</div>
		</div>
	</body>
</html>