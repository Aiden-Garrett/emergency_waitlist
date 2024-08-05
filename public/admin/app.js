let admin = {
    username: "admin",
    password: "admin",
    hospital_id: "1"
}

$("#welcome-message").text(`Welcome ${admin.username}, to the admin dashboard!`);

$("#admin-login").on("submit", function (event) {
    // stop form from actually "submitting"
    event.preventDefault();
    let login = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/api/admin/login",
        data: login,
    }).then((response) => {
        // check that response occured
        let res = JSON.parse(response);
        if (res) {
            admin.username = res.username;
            admin.password = res.password;
            admin.hospital_id = res.hospital_id;
            window.location.replace("http://localhost:8888/administrator/dashboard");
        } else {
            alert("Login failed. Try again");
        }
    })
});


$("#patient-checkin-form").on("submit", function (event) {
    event.preventDefault();
    let patientInfo = {
        firstname: $("#patient-firstname").val().toLowerCase(),
        lastname: $("#patient-lastname").val().toLowerCase(),
        code: $('#patient-code').val(),

        description: $("#injury-desc").val(),
        severity: $("#severity").val()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8888/api/admin/register",
        data: patientInfo
    }).then((response) => {
        getQueue();
    });
})

getQueue();

function getQueue() {
    $.ajax({
        type: "GET",
        url: `/staff/patient-list/${admin.hospitalId}`,
    }).then((response) => {
        let data = JSON.parse(response);
        $("#table-body").empty();

        for (let row of data) {
            let tr = $("<tr></tr>");

            tr.append(`<td>${row.firstname.charAt(0).toUpperCase() + row.firstname.slice(1)}</td>`);
            tr.append(`<td>${row.lastname.charAt(0).toUpperCase() + row.lastname.slice(1)}</td>`);
            tr.append(`<td>${row.injury_description}</td>`);
            tr.append(`<td>${row.injury_severity}</td>`);
            tr.append(`<td>${row.arrival_time}</td>`);

            let button = $('<button>admit</button>').attr('id', row.id).on('click', function () {
                console.log('clicked!');
                let body = {
                    patientId: row.id,
                    hospitalId: admin.hospitalId,
                }
                $.ajax({
                    type: "PUT",
                    url: `/staff/admitPatient`,
                    data: body,
                }).then((response) => {
                    getQueue();
                });
            });

            tr.append($('<td></td>').append(button));
            $("#table-body").append(tr);
        }
    });
}




