let admin = {
    username: "admin",
    password: "admin",
    hospitalId: "1"
}

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
    }).then((response)=> {
        // check that response occured
        let res = JSON.parse(response);
        if (res !== undefined) {
            admin.username = res.username;
            admin.password = res.password;
            admin.hospitalId = res.hospitalId;
            window.location.replace("http://localhost:8888/administrator/dashboard");
        }
    })
});


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

            tr.append(`<td>${row.firstname}</td>`);
            tr.append(`<td>${row.lastname}</td>`);
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




