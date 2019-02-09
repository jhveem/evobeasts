<?php
	$map = $_POST["map"];
	$name = $_POST["name"]; 
	$myfile = fopen($name.".map", "w");
	fwrite($myfile, $map);
	fclose($myfile);	
?>
