import { Chart } from "chart.js/auto";
import { IBarChart } from "./IChart";


export const barChart = async () => {

    const data:IBarChart[] = [
        {label: 'a', value: 4},
        {label: 'b', value: 6},
        {label: 'c', value: 12},
        {label: 'd', value: 2},
    ]


    new Chart(document.getElementById('bar') as HTMLCanvasElement, {
        type: 'bar',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            }
        },
        data: {
            labels: data.map(item => item.label),
            datasets: [{
                label: 'Кол-во специалистов:',
                data: data.map(item => item.value),
                backgroundColor: [
                    'rgba(250, 190, 122, .6)',
                    'rgba(246, 134, 106, .6)',
                    'rgba(89, 230, 246, .6)',
                    'rgba(105, 86, 229, .6)',
                ],
                borderColor: [
                    'rgba(250, 190, 122, 1)',
                    'rgba(246, 134, 106, 1)',
                    'rgba(89, 230, 246, 1)',
                    'rgba(105, 86, 229, 1)',
                ],
                borderWidth: 1
            }]
        }
    }
)

}
