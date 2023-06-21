<?php

namespace Hms\Controllers;

use Hms\Models\Appointment;

class AppointmentController extends DefaultController
{
    public function index(int $patientId = 0)
    {
        $appointments = Appointment::all();

        if ($patientId > 0) {
            $appointments = Appointment::findByPatientId($patientId);
        }

        echo json_encode($appointments, JSON_UNESCAPED_UNICODE);
    }

    public function save(array $data)
    {
        $this->validate($data, [
            'patient_id' => 'required',
            'start' => 'required',
            'end' => 'required'
        ]);

        $appointment = new Appointment();
        $appointment->setPatientId($data['patient_id']);
        $appointment->setStart($data['start']);
        $appointment->setEnd($data['end']);
        $appointment->save();

        echo json_encode($appointment);
    }

    public function update(array $data)
    {
        $appointment = Appointment::findById($data['id']);
        $appointment->setPatientId($data['patient_id']);
        $appointment->setStart($data['start']);
        $appointment->setEnd($data['end']);
        $appointment->save();

        echo json_encode($appointment);
    }

    public function delete(int $id)
    {
        $appointment = Appointment::findById($id);
        $appointment->delete();

        echo json_encode([
            "id" => $id
        ]);
    }
}
