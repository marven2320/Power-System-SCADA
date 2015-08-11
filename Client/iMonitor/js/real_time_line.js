$(function () {

    var timeLine = $('#timeline');
    var realVal = {};


    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send('timeline');

        timeLine.highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = realVal
                            series.addPoint([x, y], true, true);
                            connection.send('timeline');
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Real Time Energy Usage'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'kiloWatts'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Real time Energy Usage',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: realVal
                        });
                    }
                    return data;
                }())
            }]
        });

    };

    connection.onerror = function (error) {
        // just in there were some problems with connection...
        timeLine.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        + 'connection or the server is down.' } ));
        setTimeout(function() {
            timeLine.hide();
        },5000)
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {

        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }


        if (json.type == 'RealTimeData') {
            realVal = json.Real;

        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }


    };
});





