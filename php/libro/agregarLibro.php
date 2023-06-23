<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $nombre=$_POST['nombre'];
    $precio=$_POST['precio'];
    $editorial=$_POST['editorial'];
    $autor=$_POST['autor'];
   

        $sqlInsertar="INSERT INTO libro VALUES(null,'$nombre','$precio','$editorial','$autor')";
        if($cx->query($sqlInsertar)===true){
            $valido['success']=true;
            $valido['mensaje']="SE GUARDO CORRECTAMENTE";
        }else{
            $valido['success']=false;
            $valido['mensaje']="ERROR NO SE GUARDO";
        } 
}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);
?>