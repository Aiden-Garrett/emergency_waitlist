-- Query to get patients sorted in order of the queue
SELECT *
FROM patient
         JOIN patient_hospital on patient.id = patient_hospital.patient_id AND admission_time IS NULL AND hospital_id=1
     ORDER BY injury_severity DESC, arrival_time ASC;

-- Query to get patient position in queue
SELECT position
FROM (SELECT firstname, lastname, code, ROW_NUMBER() over (ORDER BY injury_severity DESC, arrival_time ASC) as position
      FROM patient
               JOIN patient_hospital
                    on patient.id = patient_hospital.patient_id AND admission_time IS NULL) as queue
WHERE queue.firstname = 'Tre'
  AND queue.lastname = 'White'
  AND code = '123';

-- Query to log in admin
SELECT *
FROM administrator
WHERE username = 'admin'
  AND password = 'admin';

-- Query to admit patient to hospital
UPDATE patient_hospital
SET admission_time = current_timestamp
WHERE patient_id = 1 AND hospital_id = 1;


