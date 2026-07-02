import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function IssuePieChart({ data }) {
    const chartData = [
        {name: "Open",value: data.open_issues},
        {name: "Resolved",value: data.resolved_issues}];
    const COLORS = ["#335e17", "#5CA829" ];
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
export default IssuePieChart;