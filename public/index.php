<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

// change the connection string to your preference
$dbconn = pg_connect("host=localhost port=5432 dbname=emergency_waitlist user=postgres password=password");

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $view = file_get_contents('patient/index.html');
    $response->getBody()->write($view);
    return $response;
});

$app->get('/admin', function (Request $request, Response $response, $args) {
    $view = file_get_contents('admin/index.html');
    $response->getBody()->write($view);
    return $response;
});


$app->post('/api/patient/getPosition', function (Request $request, Response $response, $args) {
    global $dbconn;
    $body = $request->getParsedBody();
    $firstname = $body['firstname'];
    $lastname = $body['lastname'];
    $code = $body['code'];
    $queryParams = array($firstname, $lastname, $code);
    $query = pg_query_params($dbconn, "SELECT position FROM (SELECT firstname, lastname, code, ROW_NUMBER() over (ORDER BY injury_severity DESC, arrival_time ASC) as position FROM patient JOIN patient_hospital on patient.id = patient_hospital.patient_id AND admission_time IS NULL) as queue WHERE queue.firstname = $1 AND queue.lastname = $2 AND code = $3", $queryParams);
    $response->getBody()->write(json_encode(pg_fetch_row($query)));
    return $response;
});

$app->get('/staff/patient-list/{hospitalId}', function (Request $request, Response $response, $args) {
    global $dbconn;
    $hospital_id = $args['hospitalId'];
    $params = array($hospital_id);
    $query = pg_query_params($dbconn, "SELECT * FROM patient JOIN patient_hospital on patient.id = patient_hospital.patient_id AND admission_time IS NULL AND hospital_id=$1 ORDER BY injury_severity DESC, arrival_time ASC", $params);
    $response->getBody()->write(json_encode(pg_fetch_all($query)));
    return $response;
});

$app->put('/staff/admitPatient', function (Request $request, Response $response, $args) {
    global $dbconn;
    $body = $request->getParsedBody();
    $patient_id = $body['patientId'];
    $hospital_id = $body['hospitalId'];
    $params = array($patient_id, $hospital_id);
    $query = pg_query_params($dbconn, "UPDATE patient_hospital SET admission_time = current_timestamp WHERE patient_id = $1 AND hospital_id = $2;", $params);
    $response->getBody()->write(json_encode($query));
    return $response;
});

$app->get('/administrator/login', function (Request $request, Response $response, $args) {
    $response->getBody()->write(file_get_contents('admin/login.html'));
    return $response;
});

$app->get('/administrator/dashboard', function (Request $request, Response $response, $args) {
    $response->getBody()->write(file_get_contents('admin/dashboard.html'));
    return $response;
});


$app->post('/api/admin/login', function (Request $request, Response $response, $args) {
    global $dbconn;
    $body = $request->getParsedBody();
    $username = $body['username'];
    $password = $body['password'];
    $queryParams = array($username, $password);
    $query = pg_query_params($dbconn, "SELECT * FROM administrator WHERE username=$1 AND password=$2", $queryParams);
    $res = pg_fetch_row($query);
    $response->getBody()->write(json_encode($res));
    return $response;
});


$app->post('/api/admin/register', function (Request $request, Response $response, $args) {
    global $dbconn;
    $body = $request->getParsedBody();
    $firstname = $body['firstname'];
    $lastname = $body['lastname'];
    $code = $body['code'];

    $description = $body['description'];
    $severity = $body['severity'];
    // just use current_timestamp from sql
    // $admission_time = $body['admission_time'];

    $queryParams = array($firstname, $lastname, $code, $description, $severity);
    $query = pg_query_params($dbconn,"WITH inserted AS (INSERT INTO patient VALUES (DEFAULT, $1, $2, $3) RETURNING id) INSERT INTO patient_hospital SELECT id, 1, $4, $5, current_timestamp FROM inserted;", $queryParams);
    $response->getBody()->write(json_encode($query));
    return $response;
});

$app->run();