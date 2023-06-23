<?php

require_once '../config.php';

$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['libroid'];
    $nombre=$_POST['nombre'];
    $precio=$_POST['precio'];
    $editorial=$_POST['editorial'];
    $autor=$_POST['autor'];

        $sqlEditar="UPDATE libro SET 
        nombre='$nombre',
        precio='$precio',
        editorial='$editorial',
        autor='$autor'
        WHERE libroid=$id";
        if($cx->query($sqlEditar)===true){
            $valido['success']=true;
            $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
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