import Highcharts from 'highcharts/highstock';
import dayjs from 'dayjs';


export const financeCoinChart = async (financeChartData: []) => {


    // Структурируем данные для фин.графика - там для каждой "свечки" нужно 4 значения. Данные по 168 часам превращаем в массив массивов. В главном - 14эл, в дочернем - 12эл
    const range = []
    const priceData = financeChartData.sparkline_in_7d.price  // цены по 168часам
    const lastUpdate = dayjs(financeChartData.last_updated)  // последнее обновление sparkline в милисикундах
    for (let i = 0; i < priceData.length; i+=12) {
        range.push(priceData.slice(i, i+12))
    }


    
    const options = {
        title: {
            text: 'Динамика за каждые 12 часов за посл.неделю (финансовый график)',
            align: 'left'
        },
    
        rangeSelector: {
            enabled: false,
            inputEnabled: false
        },
    
        navigator: {
            enabled: false
        },

        xAxis: {
            labels: {
                
            },
        },
    
        series: [{
            type: 'candlestick',
            color: '#ff5141',
            upColor: '#4aff41',
            data: range.map((item, index) => ([
                lastUpdate - 43200000 * (14 - index), // 43200000 - 12 часов в милисикундах. Делаем labels
                item[0],
                Math.max(...item),
                Math.min(...item),
                item[11]
            ])),
            lastPrice: {
                enabled: true,
                label: {
                    enabled: true,
                    backgroundColor: '#FF7F7F'
                }
            }
        }]
    };
    
    
    // Create the chart
    Highcharts.stockChart('finance-chart', options);

}
