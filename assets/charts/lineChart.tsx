import { Chart } from "chart.js/auto";
import { ILineChart } from "./IChart";


export const lineChart = async () => {

    const data:ILineChart[] = [
        {year: 2018, value: 1.1},
        {year: 2019, value: 1.3},
        {year: 2020, value: 1.8},
        {year: 2021, value: 2.2},
        {year: 2022, value: 2.1},
        {year: 2023, value: 2.3},
        {year: 2024, value: 2.7},
        {year: 2025, value: 3.0},
        {year: 2026, value: 3.5},
    ]


    new Chart(document.getElementById('line') as HTMLCanvasElement, {
        type: 'line',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            elements: {
                point: {
                    radius: 5,
                    hoverRadius: 10,
                }
            },
        },
        data: {
            labels: data.map(item => item.year),
            datasets: [{
                label: 'Капитализация:',
                data: data.map(item => item.value),
                fill: true,
                backgroundColor: 'rgba(105, 86, 229, .05)',
                borderColor: '#6956E5',
                segment: {
                    borderDash: (ctx) => { // объект ctx содержит информацию о графике, например, индексы его данных
                        const index = ctx.p0DataIndex;  // Индекс текущего сегмента
                        const currentYear = data[index].year;
                        // Условия для применения пунктирной линии
                        if (currentYear === 2024 || currentYear === 2025 || currentYear === 2026) {
                            return [5, 5]; // Пунктирная линия
                        }
                        return undefined; // Сплошная линия
                    }
                }
            }]
        }
    }
)

}
