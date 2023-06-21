<?php

namespace Hms\Controllers;

use Hms\Models\Record;

class RecordController extends DefaultController
{
    public function index()
    {
        $records = Record::all();

        echo json_encode($records, JSON_UNESCAPED_UNICODE);
    }

    public function save(array $data)
    {
        $this->validate($data, [
            'patientId' => 'required',
            'description' => 'required',
        ]);

        $record = new Record();
        $record->setpatientId($data['patientId']);
        $record->setdescription($data['description']);
        $record->save();

        echo json_encode($record);
    }

    public function update(array $data)
    {
        $record = Record::findById($data['id']);
        $record->setpatientId($data['patientId']);
        $record->setdescription($data['description']);
        $record->save();

        echo json_encode($record);
    }

    public function delete(int $id)
    {
        $record = Record::findById($id);
        $record->delete();

        echo json_encode([
            "id" => $id
        ]);
    }
}
