INSERT INTO hospital
values (DEFAULT, 'The Ottawa Hospital');

INSERT INTO administrator
VALUES (DEFAULT, 'Aiden', 'Garrett');
INSERT INTO administrator_hospital
VALUES (1, 1);

INSERT INTO administrator
values (DEFAULT, 'John', 'Doe');
INSERT INTO administrator_hospital
values (2, 1);

-- insert sample patients
INSERT INTO patient
values (DEFAULT, 'Jane', 'Doe', '123');
INSERT INTO patient_hospital
values (1, 1, 'heart attack', 10, current_timestamp);

INSERT INTO patient
values (DEFAULT, 'Tre', 'White', '123');
INSERT INTO patient_hospital
values (2, 1, 'torn achilles', 8, current_timestamp);

INSERT INTO patient
values (DEFAULT, 'Matt', 'Milano', '123');
INSERT INTO patient_hospital
values (3, 1, 'tibia fracture', 9, current_timestamp);

