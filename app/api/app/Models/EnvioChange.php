<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnvioChange extends Model
{
    use HasFactory;
    protected $table = 'envio_changes';

    protected $fillable = ['field_name', 'old_value', 'new_value'];

    public function EnvioChange()
    {
        return $this->belongsTo(Envio::class, 'envio_id');

    }

}

