<?php
	$allow_act=array('login','record','diandao','view','logout');
	if(empty($_REQUEST['action']) || ! in_array($_REQUEST['action'],$allow_act)){
		echo 'wrong';
		exit();
	}
	define('INACTION', true);
	require 'common.php';
	require 'actions/'.$_REQUEST['action'].'.php';

?>
