<?php
	function err_exit($msg=''){
		$output=array('status'=>'failure','message'=>$msg);
		echo json_encode($output);
		exit();
	}
	function db_query($query){
		$result=mysql_query($query);
		if(!$result)
			err_exit('bad query:'.$query);
		return $result;
	}
	function get_teacher($tid){
		
	}
	function get_class_name($cid){
		require_once 'db.php';
		$query="SELECT name FROM class WHERE id='$cid';";
		$result=db_query($query);
		$n=mysql_fetch_array($result);
		if(!$n)
			return null;
		else
			return $n['name'];
	}
	function get_all_students(){
		require_once 'db.php';
		$rtn=array();
		$query="SELECT * FROM student;";
		$result=mysql_query($query);
		while($s=mysql_fetch_array($result)){
			$rtn[]=array('id'=>$s['id'],'num'=>$s['num'],'name'=>$s['name']);
		}
		return $rtn;
	}
?>