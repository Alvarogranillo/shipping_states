<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envio extends Model
{
    
    use HasFactory;
    protected $fillable = ['description','Fecha_Creacion','Fecha_Entrega_Estimada','Estado'];

    public function changes()
    {
        return $this->hasMany(EnvioChange::class, 'envio_id');
    }

}

