-- Query to get patients sorted in order of the queue
SELECT *
FROM patient JOIN patient_hospital on patient.id = patient_hospital.patient_id AND admission_time IS NULL
ORDER BY injury_severity DESC, arrival_time ASC
