$("#client-info-form").on("submit", function (event) {
    // stop form from actually "submitting"
    event.preventDefault();

    let data = {
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        code: $("#code").val(),
    }
    // use post to make more like "logging in"
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/api/patient/getPosition",
        data: data,
    }).then((response)=>{
        let json = JSON.parse(response);
        let positionText = $("<p></p>").text(`Queue position: ${json.position}`);
        let waitingTimeText = $("<p></p>").text(`Estimated wait time: ${json.position * 30} minutes`);

        $("#queue-waiting-time").empty()
        $("#queue-waiting-time").append(positionText);
        $("#queue-waiting-time").append(waitingTimeText);
    });
});