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
            width="90%"
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
                />

            </LineChart>

        </ResponsiveContainer>

    );
}

export default CommitChart;