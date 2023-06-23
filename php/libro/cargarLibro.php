<?php

require_once '../config.php';
header("Content-Type: text/html;charset-8");

$valido['success']=array('success'=>false,
'mensaje'=>"",
'libroid'=>"",
'nombre'=>"",
'precio'=>"",
'editorial'=>"",
'autor'=>"");

if($_POST){
    $id=$_POST['libroid'];
    $sql="SELECT * FROM libro WHERE libroid=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['libroid']=$row[0];
    $valido['nombre']=$row[1];
    $valido['precio']=$row[2];
    $valido['editorial']=$row[3];
    $valido['autor']=$row[4];



}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR LIBRO";
}

$cx->close();
echo json_encode($valido);

?>
