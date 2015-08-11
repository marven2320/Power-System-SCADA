$(function () {

    var barchart = $('#barchart');
    var Load1 = {};
    var Load2 = {};
    var Load3 = {};
    var Load4 = {};

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send('bar')
    };

    connection.onerror = function (error) {
        // just in there were some problems with connection...
        barchart.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        + 'connection or the server is down.' } ));
        setTimeout(function() {
            barchart.hide();
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


        if (json.type == 'BarData') {
            Load1 = json.Load1;
            Load2 = json.Load2;
            Load3 = json.Load3;
            Load4 = json.Load4;
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
        barchart.highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Energy Usage'
            },
            subtitle: {
                text: 'Source: realtime data'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Power Consumption (kWh)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Overton 1',
                data: Load1

            }, {
                name: 'Luinab',
                data: Load2

            }, {
                name: 'Kiwalan',
                data: Load3

            }, {
                name: 'Overton 2',
                data: Load4

            }]
        });
    };
});