"use strict";

process.title = 'iMonitor';

//listening to serial port
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort('COM2', {
    baudrate: 57600
}, false);

var dummy ='';



// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

/**
 * Global variables
 */
// data
var Load1 = [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
var Load2 = [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3];
var Load3 = [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2];
var Load4 = [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1];
var data1 = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
var data2 = [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5];
var data3 = [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0];
var data4 = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8] ;

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {

});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request.
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');


    var connection = request.accept(null, request.origin);

    console.log((new Date()) + ' Connection accepted.');

    serialPort.open(function (error) {
        if ( error ) {
            console.log('failed to open: '+error);
        } else {
            console.log('open');
            serialPort.on('data', function(data) {
                var buff = new Buffer(data, 'utf8');
                console.log('data received: ' + data);
                dummy = (buff.toString());
                console.log(dummy);

            });
            serialPort.write("ls\n", function(err, results) {
                console.log('err ' + err);
                console.log('results ' + results);

            });
        }
    });


    // user sent some message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
            if (message.utf8Data === 'bar') { // the user is asking for the monthly energy consumption data for bar graph
                connection.sendUTF(JSON.stringify({
                    type: 'BarData',
                    Load1: Load1,
                    Load2: Load2,
                    Load3: Load3,
                    Load4: Load4
                }));
                console.log((new Date()) + ' User received bar data ');

            }else if (message.utf8Data.slice(0,3) === 'pie'){  // the user is asking for the average monthly energy consumption data for pie chart
                if(message.utf8Data === 'pieData1'){
                    connection.sendUTF(JSON.stringify({
                        type: 'PieData',
                        Load1: 45.0,
                        Load2: 26.8,
                        Load3: 18.8,
                        Load4: 9.4
                    }));
                }else if(message.utf8Data === 'pieData2'){
                    connection.sendUTF(JSON.stringify({
                        type: 'PieData',
                        Load1: 25.0,
                        Load2: 16.8,
                        Load3: 38.8,
                        Load4: 19.4
                    }));
                }else if(message.utf8Data === 'pieData3'){
                    connection.sendUTF(JSON.stringify({
                        type: 'PieData',
                        Load1: 5.0,
                        Load2: 26.8,
                        Load3: 38.8,
                        Load4: 29.4
                    }));
                }else if(message.utf8Data === 'pieData4'){
                    connection.sendUTF(JSON.stringify({
                        type: 'PieData',
                        Load1: 55.0,
                        Load2: 6.8,
                        Load3: 28.8,
                        Load4: 9.4
                    }));
                }
                console.log((new Date()) + ' User received line data ');
            }else if (message.utf8Data.slice(0,4) === 'this') {  // the user is asking for the average monthly energy consumption data for line chart
                if (message.utf8Data === 'thisDay') {
                    console.log(dummy);
                    connection.sendUTF(JSON.stringify({
                        type: 'thisData',
                        genData: 128,
                        usageData: 125,
                        costData: 960,
                        data1: data1,
                        data2: data2,
                        data3: data3,
                        data4: data4


                    }));
                } else if (message.utf8Data === 'thisWeek') {
                    connection.sendUTF(JSON.stringify({
                        type: 'thisData',
                        genData: 896,
                        usageData: 872,
                        costData: 6720,
                        data1: Load1,
                        data2: Load2,
                        data3: Load3,
                        data4: Load4
                    }));
                } else if (message.utf8Data === 'thisMonth') {
                    connection.sendUTF(JSON.stringify({
                        type: 'thisData',
                        genData: 3840,
                        usageData: 3741,
                        costData: 28800,
                        data1: data4,
                        data2: Load3,
                        data3: data2,
                        data4: Load1
                    }));
                } else if (message.utf8Data === 'thisYear') {
                    connection.sendUTF(JSON.stringify({
                        type: 'thisData',
                        genData: 46080,
                        usageData: 44892,
                        costData: 345600,
                        data1: Load2,
                        data2: data4,
                        data3: data1,
                        data4: Load2
                    }));
                }
                console.log((new Date()) + ' User received pie data ');
            }else if (message.utf8Data === 'gauge'){    // the user is asking for the real time energy usage of the system for gauge chart
                connection.sendUTF(JSON.stringify({
                    type: 'GaugeData',
                    Real: Math.round((Math.random() - 0.5) * 20), // for now we use random number
                    datanew: dummy
                }));
                console.log((new Date()) + ' User received gauge data ');
            }else if (message.utf8Data === 'timeline'){    // the user is asking for the real time energy usage of the system
                connection.sendUTF(JSON.stringify({
                    type: 'RealTimeData',
                    Real: Math.random() // for now we use random number
                }));
                console.log((new Date()) + ' User received real time data ');
            }
        }
    });

// user disconnected
    connection.on('close', function(connection) {

            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
    });

});