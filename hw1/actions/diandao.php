<?php
	if(!defined('INACTION')){
		err_exit('not allow');
	}
	if(empty($_REQUEST['badid']) || empty($_REQUEST['rid'])){
		err_exit('need params');
	}
	$badid=$_REQUEST['badid'];
	$rid=$_REQUEST['rid'];
	
	require 'db.php';
	for($i=0,$t=count($badid);$i<$t;$i++){
		$sid=$badid[$i];
		$query="INSERT INTO stu_rec (sid,rid) VALUES('$sid','$rid');";
		//echo $query;
		mysql_query($query);
	}
	echo json_encode(array(
		'status'=>'success'
	));
	
?>