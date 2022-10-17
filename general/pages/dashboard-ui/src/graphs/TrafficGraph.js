import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import React, { useState, useEffect } from 'react';  
import "../CustomTooltip.css"
import "../App.css"


const CustomTooltip = ({ active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
            <p className="label"> Date: {`${payload[0].payload?.midTimestamp}`} </p>
            <p className="label"> Total Percentage: {`${payload[0].payload?.totalPercentage}`} </p>
            <p className="label"> HTTP Percentage: {`${payload[0].payload?.httpPercentage}`} </p>
      </div>
    );
  }

  return null;
};
function TrafficGraph() {
  const [data, setData] = useState(null)
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if(data == null){
        const res = await fetch('https://serverless-api.raovaishnavi984782.workers.dev/traffic-change');
        const json = await res.json()

        let cleanedData = {}
        let array = json.data.total.timestamps
        for (let i = 0; i < array.length; i++) {
          let ts = json.data.total.timestamps[i]
          let tot = json.data.total.values[i]
          cleanedData[ts] = {
            "timestamp": ts,
            "total": tot
          }
        }
        array = json.data.http.timestamps
        for (let i = 0; i < array.length; i++) {
          let ts = json.data.http.timestamps[i]
          let tot = json.data.http.values[i]
          cleanedData[ts]["http"] = tot
        }
        let finalData = []
        for (const [key, value] of Object.entries(cleanedData)) {
          finalData.push(value)
        }
        for (let i = 0; i < finalData.length; i++) {
            let totalVal = finalData[i]['total']
            totalVal = totalVal*100
            totalVal = parseFloat(totalVal).toFixed(2)
            totalVal = totalVal.toString() + "%"
            let httpVal = finalData[i]['http']
            httpVal = httpVal*100
            httpVal = parseFloat(httpVal).toFixed(2)
            httpVal = httpVal.toString() + "%"
            let tsNew = finalData[i]['timestamp']
            let tsFinal = new Date(tsNew).toLocaleDateString('en-us', {month:"short", day:"numeric"})
            let tsMid = new Date(tsNew).toLocaleDateString('en-us', {month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
            finalData[i]['shortTimestamp'] = tsFinal
            finalData[i]['midTimestamp'] = tsMid
            finalData[i]['totalPercentage'] = totalVal
            finalData[i]['httpPercentage'] = httpVal
        }
        setData(finalData)
      }
    }
    fetchData().catch(console.error);
  }, [])
  
  return (
    <div className="App">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ac39ac" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ac39ac" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#990000" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#990000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="shortTimestamp" />
          <YAxis />
          <Tooltip content={<CustomTooltip/>} wrapperStyle={{ backgroundColor: "white" }} contentStyle={{ color: "#8884d8" }}
          viewBox={{ x: 0, y: 0, width: 400, height: 400} } />
          <Area
            type='monotone'
            dataKey='total'
            stroke="#ac39ac" fillOpacity={1} fill="url(#colorUv)"
          />
          <Area
            type='monotone'
            dataKey='http'
            stroke="#990000" fillOpacity={1} fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrafficGraph;
