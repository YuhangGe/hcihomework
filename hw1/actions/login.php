<?php
	if(!defined('INACTION')){
		err_exit('not allow');
	}
	
	if(empty($_REQUEST['email']) || empty($_REQUEST['password'])){
		err_exit('need params');
	}
	$e=$_REQUEST['email'];
	$p=$_REQUEST['password'];

	require "db.php";
	
	$query="SELECT * FROM teacher WHERE email='$e' AND password='$p';";
	$result=mysql_query($query);
	if(!$result)
		err_exit('error when query database:'.$query);
	$teacher=mysql_fetch_array($result);
	if(!$teacher){
		echo json_encode(array('status'=>'failure'));
		exit();
	}
	session_start();
	$_SESSION['tid']=$teacher['id'];
	$_SESSION['tname']=$teacher['name'];
	
	echo json_encode(array(
		'status'=>'success',
		'id'=>$teacher['id'],
		'name'=>$teacher['name'],
		'classes'=>get_teacher_classes($teacher['id'])
	));
?>

<?php
	function get_teacher_classes($tid){
		$rtn=array();	
		$query="SELECT * FROM class WHERE tid='$tid';";
		$result=mysql_query($query);
		if(!$result)
			return $rtn;
		while($c=mysql_fetch_array($result)){
			$rtn[]=array(
				'id'=>$c['id'],
				'name'=>$c['name']
			);
		}
		return $rtn;
	}
