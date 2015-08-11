$(function () {

    var gaugeChart = $('#gaugechart');
    var realVal = {};


    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send('gauge');
        gaugeChart.highcharts({

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Real Time Energy Usage'
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150,
                    background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    min: 0,
                    max: 200,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },
                    title: {
                        text: 'kW'
                    },
                    plotBands: [{
                        from: 0,
                        to: 120,
                        color: '#55BF3B' // green
                    }, {
                        from: 120,
                        to: 160,
                        color: '#DDDF0D' // yellow
                    }, {
                        from: 160,
                        to: 200,
                        color: '#DF5353' // red
                    }]
                },

                series: [{
                    name: 'Energy',
                    data: [80],
                    tooltip: {
                        valueSuffix: ' kW'
                    }
                }]

            },
            // Add some life
            function ups(chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal;

                        newVal = point.y + realVal;
                        if (newVal < 0 || newVal > 200) {
                            newVal = point.y - realVal;
                        }

                        point.update(newVal);
                        $('#realDisplay').text(newVal + ' kiloWatts');
                        connection.send('gauge')
                    },500)
                }
            });

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
    };

    connection.onerror = function (error) {
        // just in there were some problems with connection...
        gaugeChart.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        + 'connection or the server is down.' } ));
        setTimeout(function() {
            gaugeChart.hide();
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


        if (json.type == 'GaugeData') {
            realVal = json.Real;
            var newData = json.datanew;
            $('#serial').text(newData);
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }


    };
});
