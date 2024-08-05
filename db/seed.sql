INSERT INTO hospital
values (DEFAULT, 'The Ottawa Hospital');

INSERT INTO administrator
VALUES ('agarr064@toh.ca', 'Aiden', 'Garrett', 'password123');
INSERT INTO administrator_hospital
VALUES ('agarr064@toh.ca', 1);

INSERT INTO administrator
values ('admin', 'John', 'Doe', 'admin');
INSERT INTO administrator_hospital
values ('admin', 1);

-- insert sample patients
INSERT INTO patient
values (DEFAULT, 'jane', 'doe', '123');
INSERT INTO patient_hospital
values (1, 1, 'heart attack', 10, current_timestamp);

INSERT INTO patient
values (DEFAULT, 'tre', 'white', '123');
INSERT INTO patient_hospital
values (2, 1, 'torn achilles', 8, current_timestamp);

INSERT INTO patient
values (DEFAULT, 'matt', 'milano', '123');
INSERT INTO patient_hospital
values (3, 1, 'tibia fracture', 9, current_timestamp);


-- query to insert patient as administrator
WITH inserted AS (
    INSERT INTO patient
        VALUES (DEFAULT, 'micah', 'hyde', '716')
        RETURNING id)
INSERT INTO patient_hospital
SELECT id, 1, 'Stinger', 7, current_timestamp
FROM inserted;






