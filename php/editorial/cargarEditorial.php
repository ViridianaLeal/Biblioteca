<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$valido['success']=array('success'=>false,
'mensaje'=>"",
'editorialid'=>"",
'editorial'=>"");

if($_POST){
    $id=$_POST['autoid'];
    $sql="SELECT * FROM editoriales WHERE editorialid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['editorialid']=$row[0];
    $valido['editorial']=$row[1];



}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR AUTO";
}

$cx->close();
echo json_encode($valido);

?>
