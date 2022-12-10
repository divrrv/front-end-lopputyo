import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import dayjs from "dayjs";

import { API_URL_T } from '../constants';

export default function ListTrainings() {
  const [trainings, setTrainings] = useState([]);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (trainings) => {
        return dayjs(trainings.date).format("DD/MM/YYYY");
      },
    },
    { field: "activity", sortable: true, filter: true },
    { field: "duration", sortable: true, filter: true },
   
    {
      headerName: " ",
      field: "links[0].href",
      cellRenderer: params => <Button size='small' color='error' onClick={() => deleteTraining(params.data.links[0].href)}>Delete</Button>
    },
    {
      field: 'Customer', sortable: true, filter: true

    }
  ])

  useEffect(() => getTrainigs(), []);
  const getTrainigs = () => {
    fetch(API_URL_T)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          alert('something went wrong')
      })
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err))
  }
  useEffect(() => {
    getTrainigs();
  }, []);

  const deleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (response.ok) {
          getTrainigs();
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>


    </div>
  )
}