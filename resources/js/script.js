let modalInstance = null;
let modalElemPatient = document.querySelector('#patientFormModal');

modalElemPatient.addEventListener('shown.bs.modal', function () {
    modalInstance = bootstrap.Modal.getInstance(modalElemPatient);
});

modalElemPatient.addEventListener('hidden.bs.modal', function () {
    document.querySelector('#patientId').value = 0;
    document.querySelector('#firstname').value = "";
    document.querySelector('#lastname').value = "";
    document.querySelector('#street').value = "";
    document.querySelector('#zip').value = "";
    document.querySelector('#place').value = "";
});

/* patients stuff */

function loadPatients() {
    let tabled = document.querySelector('#patientShow');

    console.log(tabled);
    if (tabled.classList.contains("d-none")) {
        fetch("/patients")
            .then(response => response.json())
            .then(data => displayPatients(data));
    }
    else {
        tabled.className = "d-none";
    }


}

function savePatient() {
    const patientId = document.querySelector('#patientId').value;

    if (patientId != null && patientId > 0) {
        updatePatient(patientId);
    }
    else {
        postPatient();
    }

    return false;

}

function saveAppointment() {
    const appointmentId = document.querySelector('#appointmentId').value;

    if (appointmentId != null && appointmentId > 0) {
        updateAppointment(appointmentId);
    }
    else {
        postAppointment();
    }

    return false;

}

function updateAppointment(id) {
    const patient = document.querySelector("#patientSelect").value;
    const start = document.querySelector("#start").value;
    const end = document.querySelector("#end").value;

    fetch("/appointments", {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            patient: patient,
            start: start,
            end: end,
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }

    })
        .then(response => response.json())
        .then(data => {
            updateRowAppointment(data);
            modalInstance.hide();
        });
}

function postPatient() {
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const street = document.querySelector("#street").value;
    const zip = document.querySelector("#zip").value;
    const place = document.querySelector("#place").value;

    fetch("/patients", {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            street: street,
            zip: zip,
            place: place
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }

    })
        .then(response => {

            if (response.ok) {
                return response.json();
            }

            return response.text().then(error => { throw new Error(error) })

        })
        .then(patient => {
            showNewPatient(patient);
            loadPatients();
        })
        .catch(error => {
            const errors = JSON.parse(error.message);

            showErrorsPatient(errors);
        });
}

function postAppointment() {
    const patientId = document.querySelector("#patientSelect").value;
    const start = document.querySelector("#start").value;
    const end = document.querySelector("#end").value;

    fetch("/appointments", {
        method: 'POST',
        body: JSON.stringify({
            patientId: patientId,
            start: start,
            end: end
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }

    }).then(response => {

        if (response.ok) {
            return response.json();
        }

        return response.text().then(error => { throw new Error(error) })

    }).then(appointment => {
        showNewAppointment(appointment);
        loadAppointment();
    }).catch(error => {
        const errors = JSON.parse(error.message);

        showErrorsAppointment(errors);
    });
}

function showErrorsAppointment(errors) {
    if (errors.patientId) {
        document.querySelector('#error-patientId').className = "fw-bold text-danger";
        document.querySelector('#error-patientId').innerHTML = errors.patientId;
    }
    else {
        document.querySelector('#error-patientId').className = "d-none fw-bold text-danger";
        document.querySelector('#error-patientId').innerHTML = "";
    }

    if (errors.start) {
        document.querySelector('#error-start').className = "fw-bold text-danger";
        document.querySelector('#error-start').innerHTML = errors.start;
    }
    else {
        document.querySelector('#error-start').className = "d-none fw-bold text-danger";
        document.querySelector('#error-start').innerHTML = "";
    }

    if (errors.end) {
        document.querySelector('#error-end').className = "fw-bold text-danger";
        document.querySelector('#error-end').innerHTML = errors.end;
    }
    else {
        document.querySelector('#error-end').className = "d-none fw-bold text-danger";
        document.querySelector('#error-end').innerHTML = "";
    }

}


function showErrorsPatient(errors) {
    if (errors.firstname) {
        document.querySelector('#error-firstname').className = "fw-bold text-danger";
        document.querySelector('#error-firstname').innerHTML = errors.firstname;
    }
    else {
        document.querySelector('#error-firstname').className = "d-none fw-bold text-danger";
        document.querySelector('#error-firstname').innerHTML = "";
    }

    if (errors.lastname) {
        document.querySelector('#error-lastname').className = "fw-bold text-danger";
        document.querySelector('#error-lastname').innerHTML = errors.lastname;
    }
    else {
        document.querySelector('#error-lastname').className = "d-none fw-bold text-danger";
        document.querySelector('#error-lastname').innerHTML = "";
    }

    if (errors.street) {
        document.querySelector('#error-street').className = "fw-bold text-danger";
        document.querySelector('#error-street').innerHTML = errors.street;
    }
    else {
        document.querySelector('#error-street').className = "d-none fw-bold text-danger";
        document.querySelector('#error-street').innerHTML = "";
    }

    if (errors.zip) {
        document.querySelector('#error-zip').className = "fw-bold text-danger";
        document.querySelector('#error-zip').innerHTML = errors.zip;
    }
    else {
        document.querySelector('#error-zip').className = "d-none fw-bold text-danger";
        document.querySelector('#error-zip').innerHTML = "";
    }

    if (errors.place) {
        document.querySelector('#error-place').className = "fw-bold text-danger";
        document.querySelector('#error-place').innerHTML = errors.place;
    }
    else {
        document.querySelector('#error-place').className = "d-none fw-bold text-danger";
        document.querySelector('#error-place').innerHTML = "";
    }
}

function updatePatient(id) {
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const street = document.querySelector("#street").value;
    const zip = document.querySelector("#zip").value;
    const place = document.querySelector("#place").value;

    fetch("/patients", {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            firstname: firstname,
            lastname: lastname,
            street: street,
            zip: zip,
            place: place
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }

    })
        .then(response => response.json())
        .then(data => {
            updateRowPatient(data);
            modalInstance.hide();
        });
}

function deletePatient(id) {
    fetch("/patients", {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }

    })
        .then(response => response.json())
        .then(data => removePatient(data.id));
}

function displayPatients(patients) {
    let tbody = document.querySelector('#patientTableShow');
    tbody.innerHTML = "";

    patients.forEach(patient => {
        showNewPatient(patient);
    });

    document.querySelector('#patientShow').className = "";
}

function showNewPatient(patient) {
    let tbody = document.querySelector('#patientTableShow');

    let tr = document.createElement("tr");
    tr.id = "patient_" + patient.id;

    displayPatient(tr, patient);

    tbody.appendChild(tr);
}

function displayPatient(tr, patient) {
    let tdFirstname = document.createElement("td");
    tdFirstname.setAttribute("scope", "row");
    tdFirstname.className = "col-1";
    tdFirstname.textContent = patient.firstname;

    let tdLastname = document.createElement("td");
    tdLastname.className = "col-1";
    tdLastname.textContent = patient.lastname;

    let tdStreet = document.createElement("td");
    tdStreet.className = "col-1";
    tdStreet.textContent = patient.street;

    let tdZip = document.createElement("td");
    tdZip.className = "col-1";
    tdZip.textContent = patient.zip;

    let tdPlace = document.createElement("td");
    tdPlace.className = "col-1";
    tdPlace.textContent = patient.place;

    let tdActions = document.createElement("td");
    tdActions.className = "col-1";

    let bearbeiten = document.createElement('i');
    bearbeiten.className = "bi bi-pencil-fill";
    bearbeiten.style.cursor = "pointer";

    let editLink = document.createElement('a');
    editLink.className = "d-inline-block";
    editLink.onclick = function () {
        fillPatientEditForm(patient);
    }

    editLink.dataset.bsToggle = "modal";
    editLink.dataset.bsTarget = "#patientFormModal";
    editLink.appendChild(bearbeiten);

    let löschen = document.createElement('i');
    löschen.className = "bi bi-trash";
    löschen.style.cursor = "pointer";

    let deleteLink = document.createElement('a');
    deleteLink.className = "d-inline-block";
    deleteLink.onclick = function () {
        deletePatient(patient.id);
    }
    deleteLink.appendChild(löschen);

    tdActions.appendChild(editLink);
    tdActions.appendChild(deleteLink);

    tr.appendChild(tdFirstname);
    tr.appendChild(tdLastname);
    tr.appendChild(tdStreet);
    tr.appendChild(tdZip);
    tr.appendChild(tdPlace);
    tr.appendChild(tdActions);
}

function updateRowPatient(patient) {

    const row = document.querySelector("#patient_" + patient.id);
    row.innerHTML = "";

    displayPatient(row, patient);

}


function updateRowAppointment(appointment) {

    const row = document.querySelector("#appointment_" + appointment.id);
    row.innerHTML = "";

    displayAppointment(row, appointment);

}

function removePatient(id) {
    document.querySelector("#patient_" + id).remove();

}

function fillPatientEditForm(patient) {
    document.querySelector('#patientId').value = patient.id;
    document.querySelector('#firstname').value = patient.firstname;
    document.querySelector('#lastname').value = patient.lastname;
    document.querySelector('#street').value = patient.street;
    document.querySelector('#zip').value = patient.zip;
    document.querySelector('#place').value = patient.place;
}

function loadAppointment() {
    let tabled2 = document.querySelector('#appointmentShow');

    console.log(tabled2);
    if (tabled2.classList.contains("d-none")) {
        fetch("/appointments")
            .then(response => response.json())
            .then(data => displayAppointments(data));
    }
    else {
        tabled2.className = "d-none";
    }

}

function displayAppointments(appointments) {
    let tbody2 = document.querySelector('#appointmentTableShow');
    tbody2.innerHTML = "";

    appointments.forEach(appointment => {
        showNewAppointment(appointment);
    });

    document.querySelector('#appointmentShow').className = "";
}

function showNewAppointment(appointment) {
    let tbody3 = document.querySelector('#AppointmentTableShow');

    let tr = document.createElement("tr");
    tr.id = "appointment" + appointment.id;

    displayAppointment(tr, appointment);

    tbody3.appendChild(tr);
}

function displayAppointment(tr, appointment) {
    let tdFirstname = document.createElement("td");
    tdFirstname.setAttribute("scope", "row");
    tdFirstname.className = "col-1";
    tdFirstname.textContent = patient.firstname;

    let tdLastname = document.createElement("td");
    tdLastname.className = "col-1";
    tdLastname.textContent = patient.lastname;

    let tdActions = document.createElement("td");
    tdActions.className = "col-1";

    let bearbeiten = document.createElement('i');
    bearbeiten.className = "bi bi-pencil-fill";
    bearbeiten.style.cursor = "pointer";

    let editLink = document.createElement('a');
    editLink.className = "d-inline-block";
    editLink.onclick = function () {
        fillPatientEditForm(appointment);
    }

    editLink.dataset.bsToggle = "modal";
    editLink.dataset.bsTarget = "#appointmentFormModal";
    editLink.appendChild(bearbeiten);

    let löschen = document.createElement('i');
    löschen.className = "bi bi-trash";
    löschen.style.cursor = "pointer";

    let deleteLink = document.createElement('a');
    deleteLink.className = "d-inline-block";
    deleteLink.onclick = function () {
        deleteAppointment(appointment.id);
    }
    deleteLink.appendChild(löschen);

    tdActions.appendChild(editLink);
    tdActions.appendChild(deleteLink);

    tr.appendChild(tdFirstname);
    tr.appendChild(tdLastname);
    tr.appendChild(tdActions);
}



function displayRecords() {

}

function displayRecord() {

}

function showNewRecord(record) {

}

function changeIcon(event) {
    event.preventDefault();
    var icon = document.getElementById("icon");
    if (icon.classList.contains("bi-eye")) {
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        icon.classList.remove("bi-eye-slash");
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}

function changeIcon2(event) {
    event.preventDefault();
    var icon = document.getElementById("icon2");
    if (icon.classList.contains("bi-eye")) {
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        icon.classList.remove("bi-eye-slash");
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}