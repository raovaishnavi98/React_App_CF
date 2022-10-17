import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import React, { useState, useEffect } from 'react';  
import "../CustomTooltip.css"
import "../App.css"


const CustomTooltip = ({ active, payload, label}) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltip">
          {/* <p className="label">This chart shows the percentage of DDOS attacks on a specific date.</p> */}
          <p className="label">Date: {`${payload[0].payload?.midTimestamp}`}</p>
          <p className="label">Percentage: {`${payload[0].payload?.totalPercentage}`}</p>
        </div>
      );
    }
  
    return null;
  };
function DDOSGraph() {
  const [data, setData] = useState(null)
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if(data == null){
        const res = await fetch('https://serverless-api.raovaishnavi984782.workers.dev/attack-layer3');
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
        let finalData = []
        for (const [key, value] of Object.entries(cleanedData)) {
          finalData.push(value)
        }
        for (let i = 0; i < finalData.length; i++) {
            let percentVal = finalData[i]['total']
            percentVal = percentVal*100
            percentVal = parseFloat(percentVal).toFixed(2)
            percentVal = percentVal.toString() + "%"
            let tsNew = finalData[i]['timestamp']
            let tsFinal = new Date(tsNew).toLocaleDateString('en-us', {month:"short", day:"numeric"})
            let tsMid = new Date(tsNew).toLocaleDateString('en-us', {month:"short", day:"numeric", hour:"numeric", minute:"numeric"})
            finalData[i]['shortTimestamp'] = tsFinal
            finalData[i]['midTimestamp'] = tsMid
            finalData[i]['totalPercentage'] = percentVal
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
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
      >
          <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#ac39ac" stopOpacity={0.8}/>
              <stop offset="85%" stopColor="#ac39ac" stopOpacity={0.5}/>
              </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="shortTimestamp" />
          <YAxis dataKey="total"/>
          <Tooltip content={<CustomTooltip/>} wrapperStyle={{ backgroundColor: "white" }} contentStyle={{ color: "#8884d8" }}
          viewBox={{ x: 0, y: 0, width: 400, height: 400} } />
          <Area
            type='monotone'
            dataKey='total'
            stroke="#ac39ac" fillOpacity={1} fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DDOSGraph;
