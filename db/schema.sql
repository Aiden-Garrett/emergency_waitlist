drop table patient cascade;
drop table hospital cascade;
drop table administrator cascade;
drop table patient_hospital cascade;
drop table administrator_hospital cascade;

CREATE TABLE IF NOT EXISTS patient
(
    id        serial PRIMARY KEY,
    firstname varchar(25) NOT NULL,
    lastname  varchar(25) NOT NULL,
    code      varchar(3)  NOT NULL
);

CREATE TABLE IF NOT EXISTS administrator
(
    id        serial PRIMARY KEY,
    firstname varchar(25),
    lastname  varchar(25)
);

CREATE TABLE IF NOT EXISTS hospital
(
    id   serial PRIMARY KEY,
    name varchar(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS patient_hospital
(
    patient_id         integer,
    hospital_id        integer,
    -- details about visit
    injury_description varchar(100),
    injury_severity    integer   NOT NULL,
    arrival_time       timestamp NOT NULL,
    admission_time     timestamp, -- if null has not been seen yet, more useful than boolean as it provides more insight

    -- should arrival time be included? this will limit if a patient can be admitted multiple times
    PRIMARY KEY (patient_id, hospital_id, arrival_time),
    FOREIGN KEY (patient_id) references patient,
    FOREIGN KEY (hospital_id) references hospital
);

CREATE TABLE IF NOT EXISTS administrator_hospital
(
    admin_id    integer,
    hospital_id integer,
    FOREIGN KEY (admin_id) references administrator,
    FOREIGN KEY (hospital_id) references hospital
);
