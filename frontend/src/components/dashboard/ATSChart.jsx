
import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    Tooltip

} from "recharts";

const data=[

    {name:"Resume 1",score:92},

    {name:"Resume 2",score:95},

    {name:"Resume 3",score:89}

];

function ATSChart(){

    return(

        <div className="chart-card">

            <h2>ATS Scores</h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <XAxis dataKey="name"/>

                    <Tooltip/>

                    <Bar dataKey="score"/>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ATSChart;