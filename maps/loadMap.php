<?php
	$name = $_POST["name"]; 
	$myfile = fopen($name.".map", "r");
	echo fread($myfile, filesize($name.".map"));
	fclose($myfile);	
?>
