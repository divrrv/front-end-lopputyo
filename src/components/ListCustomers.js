import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { API_URL_C } from '../constants';

function ListCustomers() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        { field: "firstname", sortable: true, filter: true },
        { field: "lastname", sortable: true, filter: true },
        { field: "streetaddress", sortable: true, filter: true },
        { field: "postcode", sortable: true, filter: true },
        { field: "city", sortable: true, filter: true },
        { field: "email", sortable: true, filter: true },
        { field: "phone", sortable: true, filter: true },
        {
            width: 180,
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />
        },
        {
            cellRenderer: params =>
                <Button size='small' color='error' onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
        }
    ]);

    useEffect(() => getCustomers(), []);
    const getCustomers = () => {
        fetch(API_URL_C)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('something went wrong')
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getCustomers();
    }, []);



    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure'))
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        getCustomers();
                    else
                        alert('something went wrong')
                })
    };



    const addCustomer = (customer) => {
        fetch(API_URL_C, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert('something went wrong');
            })
            .catch(err => console.error(err))
    }



    const updateCustomer = (link, editedCustomer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(editedCustomer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert('something went wrong');
            })
            .catch(err => console.error(err))
    }
    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className='ag-theme-material' style={{ height: 650, width: '90%', margin: 'auto' }}>

                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>

    );
}



export default ListCustomers;





