import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import dayjs from "dayjs";

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
      headerName: 'Firstname',
      field: 'customer.firstname',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Lastname',
      field: 'customer.lastname',
      sortable: true,
      filter: true
    },
    {
      headerName: '',
      field: 'id',
      sortable: true,
      filter: true,
      cellRenderer: params => <Button size='small' color='error' onClick={() => deleteTraining(params.value)}>Delete
      </Button>
    }
  ])

  useEffect(() => {
    getTrainings();
  }, []);
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            getTrainings();
          }
          else
            alert('Something went wrong');
        })
        .catch(err => console.error(err))
    }
  }

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