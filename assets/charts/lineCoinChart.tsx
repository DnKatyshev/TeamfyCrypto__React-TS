import Highcharts from 'highcharts/highstock';
import dayjs from 'dayjs'


export const lineCoinChart = async (lineChartData: []) => {


    // Style of the Chart
    Highcharts.setOptions({

        chart: {
            backgroundColor: '#f0edff',
            zooming: {
                resetButton: {
                    theme: {
                        fill: '#f23644',
                        stroke: 'none',
                        style: {
                            color: '#ffffff'
                        },
                        r: 8,
                        states: {
                            hover: {
                                style: {
                                    color: '#000000'
                                }
                            }
                        }
                    }
                }
            }
        },

        title: {
            style: {
                color: '#393939',
                fontSize: '14px'
            }
        },

        xAxis: {
            labels: {
                style: {
                    color: '#b0abab'
                }
            }
        },

        yAxis: {
            labels: {
                style: {
                    color: '#b0abab'
                }
            }
        },

        scrollbar: {
            barBackgroundColor: '#5f5959',
            trackBorderColor: '#5f5959'
        },

        rangeSelector: {
            buttonTheme: {
                fill: 'none',
                stroke: 'none',
                style: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    padding: "6px"
                },
                states: {
                    hover: {
                        style: {
                            
                        }
                    },
                    select: {
                        style: {
                            color: '#ffcb62',
                        }
                    },
                }
            }
        },

        plotOptions: {
            area: {
                threshold: null,
                color: '#ffcb62',
                fillColor: {
                    linearGradient: [0, 0, 0, 1],
                    stops: [
                        [0, '#ffc44f'],
                        [1, '#ffe9bc']
                    ]
                }
            }
        },


        tooltip: {
            backgroundColor: '#212020',
            style: {
                color: '#fff'
            }
        }
    });

    // Configuring the Chart
    Highcharts.stockChart('line-chart', {

        title: {
            text: 'Цена за 1 год (общий график)',
            align: 'left'
        },

        xAxis: {
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            offset: 30,
        },

        scrollbar: {
            barBorderRadius: 4,
            height: 8,
            margin: 0,
            trackBorderRadius: 4
        },


        navigator: {
            enabled: false,
            xAxis: {
                gridLineWidth: 0
            },
            outlineWidth: 0,
            handles: {
                lineWidth: 0
            }
        },

        rangeSelector: {
            buttonPosition: {
                align: 'center'
            },
            buttons: [{
                type: 'month',
                count: 1,
                text: '1мес'
            }, {
                type: 'year',
                count: 1,
                text: '1год'
            }, {
                type: 'ytd',
                text: 'С начала года'
            }],
            buttonSpacing: 100,
            inputEnabled: false
        },

        tooltip: {
            shape: 'rect',
            shadow: false,
            borderWidth: 0
        },

        series: [{
            type: 'area',
            data: lineChartData.map(data => ([data[0], data[1]])),
            tooltip: {
                valueDecimals: 2,
                pointFormat: '{point.y}'
            }
        }]
    });


}
