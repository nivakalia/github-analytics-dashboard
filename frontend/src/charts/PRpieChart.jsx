import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function PRPieChart({ data }) {
    const chartData = [
        {name: "Open",value: data.open_prs},
        {name: "Closed",value: data.closed_prs} ];
    const COLORS = ["#335E17", "#5CA829" ];
    return (
        <PieChart width={580} height={300}>
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
export default PRPieChart;