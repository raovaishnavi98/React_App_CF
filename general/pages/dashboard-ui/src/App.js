import './App.css';
import TrafficGraph from './graphs/TrafficGraph';
import DDOSGraph from './graphs/DdosGraph';
import React from 'react';  
import PopularTable from './graphs/PopularData';

function App() {
  return (
    <div className="App">
      <br></br>
      <h1 className="headings"> Graph Showing HTTP traffic over total traffic for the past 30 days:</h1>
      <br></br>
      <TrafficGraph/>
      <br></br>
      <h1 className="headings"> Table showing the ranking of popular domains and their rank change for the past 30 days:</h1>
      <br></br>
      <PopularTable />
      <br></br>
      <h1 className="headings"> Graph Showing DDOS attack percentage for the past 30 days:</h1>
      <br></br>
      <DDOSGraph />
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
