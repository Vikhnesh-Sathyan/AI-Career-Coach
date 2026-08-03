import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const data = [
    { day: "Mon", score: 6 },
    { day: "Tue", score: 8 },
    { day: "Wed", score: 7 },
    { day: "Thu", score: 9 },
    { day: "Fri", score: 10 }
];

function InterviewChart() {

    return (

        <div className="chart-card">

            <h2>Interview Performance</h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line

                        type="monotone"

                        dataKey="score"

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default InterviewChart;