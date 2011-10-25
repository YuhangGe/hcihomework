<?php
if (!defined('INACTION')) {
	err_exit('not allow');
}
if (empty($_REQUEST['date']) || empty($_REQUEST['type']) || empty($_REQUEST['classid'])) {
	err_exit('need params');
}
$date = $_REQUEST['date'];
$type = $_REQUEST['type'];
$cid = $_REQUEST['classid'];

require 'db.php';
$query = "SELECT * FROM record WHERE to_days(date)=to_days('$date') AND cid='$cid' AND type='$type';";
$result = db_query($query);
$r = mysql_fetch_array($result);
$bad_id = array();
if ($r) {
	$id = $r['id'];
	$query = "SELECT * FROM stu_rec WHERE rid='$id';";
	$result = db_query($query);
	while ($sid = mysql_fetch_array($result)) {
		$bad_id[] = $sid['sid'];
	}
	echo json_encode(array('status' => 'success', 'id' => $id, 'bad_id' => $bad_id));
} else {
	echo json_encode(array('status' => 'failure'));
}
?>