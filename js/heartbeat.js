$(document).ready(function() {
    var intervalSeconds = 5
    var heartbeatPage = '/heartbeat'

    function cycle() {
        setTimeout(function () {
            $.get(heartbeatPage + '?r=' + Math.random())
            cycle()
        },
        (intervalSeconds * 1000)
    )}
    cycle()
})