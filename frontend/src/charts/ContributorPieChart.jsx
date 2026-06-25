import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
function ContributorPieChart({ data }) {
    const COLORS = ["#5CA829","#335E17","#bdea81","#8AD657","#488320"];
    return (
        <PieChart width={600} height={350}>
            <Pie
                data={data}
                dataKey="contributions"
                nameKey="login"
                outerRadius={120}
                label
            >
                {data.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>

    );
}

export default ContributorPieChart;