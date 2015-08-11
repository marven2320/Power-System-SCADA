$(function () {

    var pieChart = $('#piechart'),
        lineChart = $('#lineChart'),
        sendString = 'pieData1',
        chart,linechart;


    var Load1 = {},
         Load2 = {},
         Load3 = {},
         Load4 = {},
        data1 = {},
        data2 = {},
        data3 = {},
        data4 = {},
         genData ={},
        usageData = {},
        costData ={},
        datanew = '';


    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        connection.send(sendString);
        connection.send(('thisDay'));
        createPieChart();
        createLineChart();
    };

    connection.onerror = function () {
        // just in there were some problems with connection...
        pieChart.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        + 'connection or the server is down.' } ));
        setTimeout(function() {
            pieChart.hide();
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

        if (json.type == 'PieData') {
            Load1 = json.Load1;
            Load2 = json.Load2;
            Load3 = json.Load3;
            Load4 = json.Load4;
            pieupdate();
        } else if(json.type == 'thisData'){
            genData = json.genData;
            usageData = json.usageData;
            costData = json.costData;
            data1 = json.data1;
            data2 = json.data2;
            data3 = json.data3;
            data4 = json.data4;

            upData();
            lineupdate();

        } else if(json.type == 'serialData'){
            datanew = json.datanew;
            $('#serial').text(datanew);

        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }

    };


        $('#radio2a').click(function() {
            sendString = 'pieData1';
            connection.send(sendString);

        });
        $('#radio2b').click(function() {
            sendString = 'pieData2';
            connection.send(sendString);
        });
        $('#radio2c').click(function() {
            sendString = 'pieData3';
            connection.send(sendString);
        });
        $('#radio2d').click(function() {
            sendString = 'pieData4';
            connection.send(sendString);
        });
        $('#thisday').click(function() {
            sendString = 'thisDay';
            connection.send(sendString);

        });
        $('#weekly').click(function() {
            sendString = 'thisWeek';
            connection.send(sendString);
        });
        $('#monthly').click(function() {
            sendString = 'thisMonth';
            connection.send(sendString);
        });
        $('#yearly').click(function() {
            sendString = 'thisYear';
            connection.send(sendString);
        });

    function createPieChart(){
        // Build the chart
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'piechart',
                //Problem only occurs on pie
                type: 'pie',
                animation: {
                    duration: 1000
                }
            },
            title: {
                text: 'Division of Load in each Line'
            },
            xAxis: {},
            plotOptions: {
                series: {
                    animation: { duration : 0 } //Problem only occurs when plotOptions animation:false
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },

            series: [{
                data: [
                    ['Overton 1',   45.0],
                    ['Luinab',       26.8],
                    {
                        name: 'Kiwalan',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Overton 2',   0.7]
                ]

            }]
        });
    }
    function createLineChart() {
        linechart = new Highcharts.Chart({
            chart: {
                renderTo: 'linechart',
                //Problem only occurs on pie
                type: 'line',
                animation: {
                    duration: 1000
                }
            },
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Overton 1',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Luinab',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Kiwalan',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'Overton 2',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    };

    function pieupdate(){
        chart.series[0].data[0].update(Load1);
        chart.series[0].data[1].update(Load2);
        chart.series[0].data[2].update(Load3);
        chart.series[0].data[3].update(Load4);
    }
    function lineupdate(){
        linechart.series[0].data[0].update(data1);
        linechart.series[0].data[1].update(data2);
        linechart.series[0].data[2].update(data3);
        linechart.series[0].data[3].update(data4);
    }

    function upData(){
        $('#generated').text(genData + ' kWHr');
        $('#usage').text(usageData + ' kWHr');
        $('#cost').text('Php ' + costData);

    }

});
