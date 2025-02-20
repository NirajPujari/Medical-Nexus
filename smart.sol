// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalManagementSystem {
    struct File {
        string fileName;
        string timestamp;
        string filePath;
        string fileType;
        string fileHash;
    }

    struct Appointment {
        uint256 id;
        uint256 patientId;
        uint256 doctorId;
        string timestamp;
        string status; // e.g., "Scheduled", "Completed", "Cancelled"
    }

    struct AuthorizedPerson {
        string personAddress;
        string role;
    }

    struct Patient {
        uint256 id;
        string name;
        uint256 age;
        string bloodGroup;
        string medicalHistory;
        File[] files;
        AuthorizedPerson[] authorizedPersons;
    }

    struct Doctor {
        uint256 id;
        string name;
        string doctorAddress;
        string specialization;
        string[][] availability;
        uint256[] assignedPatients;
    }

    Patient[] private patients;
    Doctor[] private doctors;
    Appointment[] private appointments;

    uint256 private nextPatientId = 1;
    uint256 private nextDoctorId = 1;
    uint256 private nextAppointmentId = 1;

    string private ADMIN =
        "A7XG9B2LD3HQWVTYCUFJMKZP6N4E5RO8IYXPQBGHLZJVDTAKRUCFWMSNO2134789";

    // Utility functions
    function compareStrings(
        string memory a,
        string memory b
    ) public pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }

    function uintToString(uint256 value) public pure returns (string memory) {
        if (value == 0) return "0";
        bytes memory buffer;
        while (value != 0) {
            buffer = abi.encodePacked(bytes1(uint8(48 + (value % 10))), buffer);
            value /= 10;
        }
        return string(buffer);
    }

    // Fetch latest IDs
    function fetchLatestID() public view returns (uint256, uint256, uint256) {
        return (nextPatientId, nextDoctorId, nextAppointmentId);
    }

    // Auth Functions
    function isAuthPatient(
        uint256 id,
        string memory _accessorId
    ) private view returns (bool) {
        if (
            compareStrings(_accessorId, ADMIN) ||
            compareStrings(uintToString(id), _accessorId)
        ) {
            return true;
        }

        if (id < nextPatientId && id > 0) {
            for (
                uint256 i = 0;
                i < patients[id - 1].authorizedPersons.length;
                i++
            ) {
                if (
                    compareStrings(
                        _accessorId,
                        patients[id - 1].authorizedPersons[i].personAddress
                    )
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    function isAuthDoctor(
        uint256 id,
        string memory _accessorId
    ) private view returns (bool) {
        if (
            compareStrings(_accessorId, ADMIN) ||
            compareStrings(uintToString(id), _accessorId)
        ) {
            return true;
        }

        return false;
    }

    // --- Patient Functions ---
    function addPatient(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _bloodGroup,
        string memory _medicalHistory,
        File[] memory _files,
        AuthorizedPerson[] memory _authorizedPersons
    ) public {
        Patient storage newPatient = patients.push();
        newPatient.id = _id;
        newPatient.name = _name;
        newPatient.age = _age;
        newPatient.bloodGroup = _bloodGroup;
        newPatient.medicalHistory = _medicalHistory;

        for (uint256 i = 0; i < _files.length; i++)
            newPatient.files.push(_files[i]);
        for (uint256 i = 0; i < _authorizedPersons.length; i++)
            newPatient.authorizedPersons.push(_authorizedPersons[i]);

        nextPatientId++;
    }

    function getPatient(
        uint256 _id,
        string memory _accessorId
    ) public view returns (Patient memory) {
        require(_id < nextPatientId && _id > 0, "Invalid patient ID");
        require(isAuthPatient(_id, _accessorId));
        return patients[_id - 1];
    }

    function getAllPatients(
        string memory _accessorId
    ) public view returns (Patient[] memory) {
        require(compareStrings(_accessorId, ADMIN), "Unauthorized access");
        return patients;
    }

    function manageFileInPatient(
        uint256 _patientId,
        int256 _fileIndex, // Use int256 to handle -1 for adding a new file
        string memory _fileName,
        string memory _timestamp,
        string memory _filePath,
        string memory _fileType,
        string memory _fileHash,
        string memory _accessorId
    ) public {
        require(
            _patientId < nextPatientId && _patientId > 0,
            "Invalid patient ID"
        );
        require(isAuthPatient(_patientId, _accessorId), "Unauthorized access");

        File memory file = File({
            fileName: _fileName,
            timestamp: _timestamp,
            filePath: _filePath,
            fileType: _fileType,
            fileHash: _fileHash
        });
        if (_fileIndex == -1) {
            // Add a new file
            patients[_patientId - 1].files.push(file);
        } else {
            // Replace an existing file
            require(
                uint256(_fileIndex) < patients[_patientId - 1].files.length,
                "Invalid file index"
            );
            patients[_patientId - 1].files[uint256(_fileIndex)] = file;
        }
    }

    function deleteFileFromPatient(
        uint256 _patientId,
        uint256 _fileIndex,
        string memory _accessorId
    ) public {
        require(
            _patientId < nextPatientId && _patientId > 0,
            "Invalid patient ID"
        );
        require(isAuthPatient(_patientId, _accessorId), "Unauthorized access");
        require(
            _fileIndex < patients[_patientId - 1].files.length &&
                _fileIndex >= 0,
            "Invalid file index"
        );

        File[] storage files = patients[_patientId - 1].files;

        require(_fileIndex < files.length, "Invalid file index");
        for (uint256 i = _fileIndex; i < files.length - 1; i++) {
            files[i] = files[i + 1];
        }

        files.pop();
    }

    function addAuthorizedPerson(
        uint256 _patientId,
        string memory _accessorId,
        string memory _role
    ) public {
        require(
            _patientId < nextPatientId && _patientId > 0,
            "Invalid patient ID"
        );
        patients[_patientId - 1].authorizedPersons.push(
            AuthorizedPerson(_accessorId, _role)
        );
    }

    // --- Doctor Functions ---
    function addDoctor(
        uint256 _id,
        string memory _name,
        string memory _doctorAddress,
        string memory _specialization,
        string[][] memory _availability,
        uint256[] memory _assignedPatients,
        string memory _accessorId
    ) public {
        require(compareStrings(_accessorId, ADMIN), "Unauthorized access");

        Doctor storage newDoctor = doctors.push();
        newDoctor.id = _id;
        newDoctor.name = _name;
        newDoctor.doctorAddress = _doctorAddress;
        newDoctor.specialization = _specialization;

        for (uint256 i = 0; i < _availability.length; i++)
            newDoctor.availability.push(_availability[i]);
        for (uint256 i = 0; i < _assignedPatients.length; i++)
            newDoctor.assignedPatients.push(_assignedPatients[i]);

        nextDoctorId++;
    }

    function setDoctorAvailability(
        uint256 _doctorId,
        uint256 _dayOfWeek,
        string[] memory _timeSlots,
        string memory _accessorId
    ) public {
        require(_doctorId < nextDoctorId && _doctorId > 0, "Invalid doctor ID");
        require(
            isAuthDoctor(_doctorId, _accessorId),
            "Not authorized to view this doctor's data"
        );
        require(_dayOfWeek < 7, "Invalid day of Week");

        // Ensure the availability array has enough days
        while (doctors[_doctorId - 1].availability.length <= _dayOfWeek)
            doctors[_doctorId - 1].availability.push();

        // Update availability for the specified day
        doctors[_doctorId - 1].availability[_dayOfWeek] = _timeSlots;
    }

    function assignPatientToDoctor(
        uint256 _patientId,
        uint256 _doctorId,
        string memory _accessorId
    ) public {
        require(
            (_doctorId < nextDoctorId && _doctorId > 0) &&
                (_patientId < nextPatientId && _patientId > 0),
            "Invalid ID"
        );
        require(
            isAuthDoctor(_doctorId, _accessorId),
            "Not authorized to view this doctor's data"
        );

        uint256[] storage assignedPatients = doctors[_doctorId - 1].assignedPatients;
        for (uint256 i = 0; i < assignedPatients.length; i++) {
            if (assignedPatients[i] == _patientId) {
                return; 
            }
        }

        doctors[_doctorId - 1].assignedPatients.push(_patientId);
        addAuthorizedPerson(
            _patientId,
            uintToString(_doctorId),
            "Doctor"
        );
    }

    function getDoctor(
        uint256 _doctorId,
        string memory _accessorId
    ) public view returns (Doctor memory) {
        require(_doctorId < nextDoctorId && _doctorId > 0, "Invalid doctor ID");
        require(
            isAuthDoctor(_doctorId, _accessorId),
            "Not authorized to view this doctor's data"
        );
        return doctors[_doctorId - 1];
    }

    function getAllDoctor(
        string memory _accessorId
    ) public view returns (Doctor[] memory) {
        require(compareStrings(_accessorId, ADMIN), "Unauthorized access");
        return doctors;
    }

    function checkDoctorSlot(
        uint256 _doctorId,
        uint256 _dayOfWeek,
        string memory _slot
    ) public view returns (bool) {
        string[] storage slots = doctors[_doctorId - 1].availability[
            _dayOfWeek
        ];
        for (uint256 i = 0; i < 7; i++) {
            if (compareStrings(_slot, slots[i])) {
                return true;
            }
        }
        return false;
    }

    // Book an Appointment
    function bookAppointment(
        uint256 _appointmentId,
        uint256 _patientId,
        uint256 _doctorId,
        string memory _timestamp,
        uint256 _dayOfWeek
    ) public {
        require(
            (_doctorId < nextDoctorId && _doctorId > 0) &&
                (_patientId < nextPatientId && _patientId > 0),
            "Invalid ID"
        );
        require(
            checkDoctorSlot(_doctorId, _dayOfWeek, _timestamp),
            "Slot unavailable"
        );
        Appointment storage newAppointment = appointments.push();

        newAppointment.id = _appointmentId;
        newAppointment.patientId = _patientId;
        newAppointment.doctorId = _doctorId;
        newAppointment.timestamp = _timestamp;
        newAppointment.status = "Scheduled";

        nextAppointmentId++;
    }

    function updateAppointmentStatus(
        uint256 _appointmentId,
        string memory _newStatus
    ) public {
        require(
            _appointmentId > 0 && _appointmentId < nextAppointmentId,
            "Invalid appointment ID"
        );
        bool cstate = compareStrings(_newStatus, "Cancelled");
        bool costate = compareStrings(_newStatus, "Completed");
        require(cstate || costate, "Invalid status");
        require(
            compareStrings(
                appointments[_appointmentId - 1].status,
                "Scheduled"
            ),
            "No Appointment found"
        );

        appointments[_appointmentId - 1].status = _newStatus;
    }

    function fetchAppointments(
        uint256 _id,
        string memory _accessorType
    ) public view returns (Appointment[] memory) {
        require(
            compareStrings(_accessorType, "Patient") ||
                compareStrings(_accessorType, "Doctor") ||
                compareStrings(_accessorType, "Admin"),
            "Invalid accessor type"
        );

        if (compareStrings(_accessorType, "Admin")) {
            require(
                compareStrings(_accessorType, ADMIN),
                "Unauthorized access"
            );
            return appointments; // Admin has access to all appointments
        }

        bool isPatient = compareStrings(_accessorType, "Patient");
        if (isPatient) {
            require(_id > 0 && _id < nextPatientId, "Invalid patient ID");
        } else {
            require(_id > 0 && _id < nextDoctorId, "Invalid doctor ID");
        }

        // Filter appointments based on the accessor type and ID
        uint256 count = 0;
        for (uint256 i = 0; i < appointments.length; i++) {
            if (
                (isPatient && appointments[i].patientId == _id) ||
                (!isPatient && appointments[i].doctorId == _id)
            ) {
                count++;
            }
        }

        Appointment[] memory result = new Appointment[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < appointments.length; i++) {
            if (
                (isPatient && appointments[i].patientId == _id) ||
                (!isPatient && appointments[i].doctorId == _id)
            ) {
                result[index] = appointments[i];
                index++;
            }
        }

        return result;
    }
}
