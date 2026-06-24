import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function PRPieChart2({ data }) {

    const chartData = [
        {
            name: "Open",
            value: data.open_prs
        },
        {
            name: "Merged",
            value: data.merged_prs
        },
        {
            name:"Closed",
            value: data.closed_prs
        }
    ];

    const COLORS = [
        "#f59e0b", // orange
        "#10b981", // green
        "CC2C0E"
    ];

    return (

        <PieChart width={400} height={300}>

            <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
            >

                {chartData.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />

                ))}

            </Pie>

            <Tooltip />
            <Legend />

        </PieChart>

    );
}

export default PRPieChart2;