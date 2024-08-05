$("#client-info-form").on("submit", function (event) {
    // stop form from actually "submitting"
    event.preventDefault();

    let data = {
        firstname: $("#firstname").val().toLowerCase(),
        lastname: $("#lastname").val().toLowerCase(),
        code: $("#code").val(),
    }
    // use post to make more like "logging in"
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/api/patient/getPosition",
        data: data,
    }).then((response) => {
        let position = JSON.parse(response);
        let messageText;

        $("#queue-waiting-time").empty()

        if (!position) {
            alert("Could not find in the queue. Try again");
        } else {
            messageText = $("<p></p>").text(`Hello ${data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1)} ${data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1)}, your wait time and queue position is listed below:`);
            let positionText = $("<p></p>").text(`Queue position: ${position}`);
            let waitingTimeText = $("<p></p>").text(`Estimated wait time: ${position * 15} minutes`);
            $("#queue-waiting-time").append(messageText);
            $("#queue-waiting-time").append(positionText);
            $("#queue-waiting-time").append(waitingTimeText);
        }
    });
});