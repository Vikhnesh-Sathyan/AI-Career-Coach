import "../../styles/interviewchart.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import { useEffect, useState } from "react";

import { getInterviewHistory } from "../../services/interviewHistoryService";

function InterviewChart() {

    const [data,setData]=useState([]);

    useEffect(()=>{

        loadChart();

    },[]);

    const loadChart = async()=>{

        const token = localStorage.getItem("token");

        if(!token) return;

        const res = await getInterviewHistory(token);

        if(res.success){

            const chartData = res.history
            .slice()
            .reverse()
            .map((item,index)=>({

                name:`${index+1}`,

                score:item.score

            }));

            setData(chartData);

        }

    };

    return(

        <div className="chart-card">

            <div className="chart-header">

                <h2>Interview Progress</h2>

                <span>Last Attempts</span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,.06)"
                    />

                    <XAxis
                        dataKey="name"
                        stroke="#94A3B8"
                    />

                    <YAxis
                        stroke="#94A3B8"
                    />

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3B82F6"
                        strokeWidth={4}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default InterviewChart;