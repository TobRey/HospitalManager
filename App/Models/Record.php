<?php

namespace Hms\Models;

use Hms\Gateways\RecordGateway;
use JsonSerializable;

class Record implements JsonSerializable
{
    private int $id = 0;
    private int $patientId = 0;
    private string $description;

    public function __construct(int $id = 0)
    {
        $this->id = $id;
    }

    public static function all(): array
    {
        $gateway = new RecordGateway();
        $records = [];

        $tmpRecords = $gateway->all();

        if ($tmpRecords) {
            while ($tmpRecord = $tmpRecords->fetch_assoc()) {
                $record = new Record();
                $record->id = $tmpRecord['id'];
                $record->patientId = $tmpRecord['patient_id'];
                $record->description = $tmpRecord['description'];

                $records[] = $record;
            }
        }

        return $records;
    }

    public static function findById(int $id): ?Record
    {
        $gateway = new RecordGateway();

        $tmpRecord = $gateway->findById($id);

        $record = null;

        if ($tmpRecord) {
            $record = new Record();
            $record->id = $tmpRecord['id'];
            $record->patientId = $tmpRecord['patient_id'];
            $record->description = $tmpRecord['description'];
        }

        return $record;
    }

    public static function findByPatientId(int $recordId): array
    {
        $gateway = new RecordGateway();
        $records = [];

        $tmpRecords = $gateway->findByFields([
            'patient_id' => $recordId
        ]);

        if ($tmpRecords) {
            while ($tmpRecord = $tmpRecords->fetch_assoc()) {
                $record = new Record();
                $record->id = $tmpRecord['id'];
                $record->patientId = $tmpRecord['patient_id'];
                $record->description = $tmpRecord['description'];

                $records[] = $record;
            }
        }

        return $records;
    }

    public function save()
    {
        $gateway = new RecordGateway();

        if (!$this->id) {
            $gateway->insert([
                'patient_id' => $this->patientId,
                'description' => $this->description
            ]);
        } else {
            $gateway->update($this->id, [
                'patient_id' => $this->patientId,
                'description' => $this->description
            ]);
        }
    }

    public function delete()
    {
        $gateway = new RecordGateway();
        $gateway->delete($this->id);
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description)
    {
        $this->description = $description;
    }

    public function setPatientId(int $patientId)
    {
        $this->patientId = $patientId;
    }

    public function getPatient(): ?Patient
    {
        $gateway = new RecordGateway();

        $tmpPatient = $gateway->getRelation($this->patientId, "patient", "1");
        $patient = null;

        if ($tmpPatient  && $tmpPatient->num_rows == 1) {
            $tmpPatient = $tmpPatient->fetch_assoc();
            $patient = new Patient($tmpPatient['id']);
            $patient->setFirstname($tmpPatient['firstname']);
            $patient->setLastname($tmpPatient['lastname']);
            $patient->setStreet($tmpPatient['street']);
            $patient->setZip($tmpPatient['zip']);
            $patient->setPlace($tmpPatient['place']);
        }

        return $patient;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'patient' => $this->getPatient(),
            'description' => $this->description
        ];
    }
}
