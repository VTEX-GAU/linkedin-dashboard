import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, Colors } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

function PieChart({labels, data, chartTitle, descriptionOfTooltip, displayTitle, aspectRatio, legendPosition}) {
    const dataConfig = {
        labels,
        datasets: [
            {
                label: descriptionOfTooltip,
                data,
                backgroundColor: [
                    'rgba(186, 97, 97, 1)',
                    'rgba(186, 136, 97, 1)',
                    'rgba(186, 168, 97, 1)',
                    'rgba(164, 186, 97, 1)',
                    'rgba(127, 186, 97, 1)',
                    'rgba(97, 186, 146, 1)',
                    'rgba(97, 159, 186, 1)',
                    'rgba(97, 124, 186, 1)',
                    'rgba(127, 97, 186, 1)',
                    'rgba(161, 97, 186, 1)',
                    'rgba(186, 97, 164, 1)',
                    'rgba(186, 97, 136, 1)',
                    'rgba(143, 103, 103, 1)',
                    'rgba(103, 128, 143, 1)',
                ],
                borderWidth: 0,
            },
        ],
    }

    return (
    <Doughnut 
        data={dataConfig}
        options={{
            aspectRatio: aspectRatio,
            plugins: {
                title: {display: displayTitle, text: chartTitle, font: {size: 20}},
                legend: {position: legendPosition, labels: {pointStyle: 'circle', usePointStyle: true}}
            }
        }}
    />)
}

export default PieChart;