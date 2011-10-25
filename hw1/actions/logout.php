<?php
	if(!defined('INACTION')){
		err_exit('not allow');
	}
	
	@session_destroy();//删除所有session，用户登出
	echo json_encode(array("status"=>"success"));
?>