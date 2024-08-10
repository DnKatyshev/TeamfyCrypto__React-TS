import { Chart } from "chart.js/auto";
import { IPieChart } from "./IChart";


export const pieChart = async () => {

    const data:IPieChart[] = [
        {label: 'Крипто-кошельки', value: 3},
        {label: 'Прогнозы / инсайды', value: 14},
        {label: 'Крипто-обменники', value: 6},
        {label: 'IT-продукты', value: 10},
    ]


    new Chart(document.getElementById('pie') as HTMLCanvasElement, {
        type: 'doughnut',
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
                label: 'Проект:',
                data: data.map(item => item.value),
                backgroundColor: [
                    '#6956E5',
                    '#FB896B',
                    '#F8C07F',
                    '#67FF56',
                ],
                hoverOffset: 10
            }]
        }
    }
)

}
