import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function CommitChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
            
        >

            <LineChart data={data}>

                <CartesianGrid />

                <XAxis
                    dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#335E17"

                />

            </LineChart>

        </ResponsiveContainer>

    );
}

export default CommitChart;