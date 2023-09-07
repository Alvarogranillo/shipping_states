<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Envio;
use App\Models\EnvioChange;

class EnvioController extends Controller
{
   
    public function index()
    {
       $envios = Envio::all();
       return $envios;
    }

    public function store(Request $request)
    {
    try {
        $envio = new Envio();

        $request->validate([
            'description' => 'required|string',
            'Fecha_Entrega_Estimada' => 'nullable|date',
            'Estado' => 'required|in:Delivered,In Transit,Delayed', 
        ]);

        $envio->description = $request->input('description');
        $envio->Fecha_Creacion = $request->input('Fecha_Creacion');
        $envio->Fecha_Entrega_Estimada = $request->input('Fecha_Entrega_Estimada');
        $envio->Estado = $request->input('Estado');
    
        $result = $envio->save();  
        
        if (!$result) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo registrar',
            ], 400);  
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Envío registrado con éxito',
            'envio' => $envio,
        ], 200);  

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Ocurrió un error al intentar registrar el envío',
        ], 500);  
    }
}
   
    public function show($id)
    {
        $envio = new Envio();
        $envio = Envio::find($id);
        return $envio;
    }

    //update
    public function update(Request $request, $id)
    {
    $request->validate([
        'description' => 'required|string',
        'Fecha_Entrega_Estimada' => 'nullable|date',
        'Estado' => 'required|in:Delivered,In Transit,Delayed',
    ]);

    $envio = Envio::findOrFail($id);
    $changes = [];

    foreach ($envio->getAttributes() as $field => $originalValue) {
        $newValue = $request->input($field);

        if ($originalValue != $newValue) {
            $changes[] = [
                'field_name' => $field,
                'old_value' => $originalValue,
                'new_value' => $newValue,
            ];
        }
    }

    
    if (!empty($changes)) {
        $envio->update($request->all());
        $envio->changes()->createMany($changes);
    }

    return $envio;
}


//destroy
public function destroy($id)
{
    try {
        $envio = Envio::destroy($id);

        if ($envio == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo eliminar el envío',
            ], 400);  
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Envío eliminado con éxito',
            'id' => $id,
        ], 200);  

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Ocurrió un error al intentar eliminar el envío',
        ], 500);  
    }
}
//action
public function action(Request $request, $id)
{
    try {
        $envio = Envio::find($id);

        if (!$envio) {
            return response()->json([
                'status' => 'error',
                'message' => 'Envío no encontrado',
            ], 404);
        }

        $request->validate([
            'Id' => 'required|int',
            'Estado' => 'required|in:Delivered,In Transit,Delayed',
        ]);

        // Crear un objeto para registrar los cambios
        $envioChange = new EnvioChange();
        $envioChange->envio_id = $envio->id;

        // Comprobar si el campo 'Id' cambió y registrar el cambio
        if ($envio->Id != $request->input('Id')) {
            $envioChange->field_name = 'Id';
            $envioChange->old_value = $envio->Id;
            $envioChange->new_value = $request->input('Id');
            $envio->Id = $request->input('Id');
        }

        // Comprobar si el campo 'Estado' cambió y registrar el cambio
        if ($envio->Estado != $request->input('Estado')) {
            $envioChange->field_name = 'Estado';
            $envioChange->old_value = $envio->Estado;
            $envioChange->new_value = $request->input('Estado');
            $envio->Estado = $request->input('Estado');
        }

        // Guardar el registro de cambios si hay cambios
        if (!empty($envioChange->field_name)) {
            $envioChange->save();
        }

        $result = $envio->save();

        if (!$result) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo actualizar el estado',
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Envío actualizado con éxito',
            'envio' => $envio,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Ocurrió un error al intentar actualizar el envío',
        ], 500);
    }
}//fin action
}









