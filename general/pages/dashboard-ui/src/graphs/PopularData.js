import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { green, red, grey } from '@mui/material/colors';
import useWidthInfo from '../WidthInfo';
import '../Table.css'
import { fontSize } from '@mui/system';


async function PopularTableData() {
  const res = await fetch('https://serverless-api.raovaishnavi984782.workers.dev/popular-domains');
  const json = await res.json()
  let array = json.rankingEntries

  const data = []
  for(let i = 0; i < array.length; i++){
    let rankData = "-"
    if(array[i]['rankChange'] == '1') {
      rankData = <ArrowDropUpTwoToneIcon sx={{ color: green[500], fontSize: '40px'}}/>
    } else if(array[i]['rankChange'] == '-1') {
      rankData = <ArrowDropDownTwoToneIcon sx={{ color: red[500], fontSize: '40px' }}/>
    } else if (array[i]['rankChange'] == '0'){
      rankData = <ArrowRightIcon sx={{ color: grey[500], fontSize: '40px' }}/>
    }

    data.push({
      rank: array[i]['rank'],
      name: array[i]['domain'],
      cat: array[i]['category'],
      rankChange: rankData
    })
  }
  return data
}

export default function PopularTable() {

  const [data, setData] = useState([]);
  const defaultMaterialTheme = createTheme();

  useEffect(() => {
    async function popData() {
      setData(await PopularTableData());
    };

    if (data.length == 0) {
      popData();
    }
  }, []);


  const columns = [
    { title: "RANK", field: "rank" },
    { title: "NAME", field: "name" },
    { title: "CATEGORY", field: "cat"},
    { title: "RANK CHANGE", field: "rankChange"},
  ];
  return (<>
    <div style={{ width: useWidthInfo(), height: '25' }} className='tablebody'>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable 
            title="Popular Domains Ranking" 
            columns={columns} 
            data={data} 
            options={{
            paging:false,
            search: false,
            headerStyle: {
              fontFamily: 'Helvetica',
              fontSize: "20px",
              fontWeight: "800",
              color: '#4d0000',
              backgroundColor: '#ffe6e6',
            },
            rowStyle: (row) => {
              const rowStyling = {
                fontFamily: 'Helvetica',
                fontSize: "20px",
                fontWeight: "800",
                color: '#4d0000',
                backgroundColor: '#ffe6e6',
              };
            return rowStyling;
            },
            }}
          />
        </ThemeProvider>
    </div>
    </> )
}


