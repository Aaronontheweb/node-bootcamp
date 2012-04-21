<?php

/* PHP CODE FOR READING A SIMPLE FILE TO CONSOLE */

var fileOut = file_get_contents(getcwd() . "/README.md");
if (!fileOut)
    echo "Could not read file";
else
    echo fileOut;

?>