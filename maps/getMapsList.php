<?php
	$path    = getcwd(); 
	$files = scandir($path);
	echo "<option></option>";
	foreach ($files as $fname) {
		$ext = substr($fname, -3);
		if ($ext == 'map') {
			$map = substr($fname, 0, -4);
			echo "<option value='".$map."'>".$map. "</option>";
		}
	}
?>
