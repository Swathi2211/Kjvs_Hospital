import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../dashboard/Dmain.css';
import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';

export default function DAttenList() {
    const [list, setList] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const calculateWorkingHours = (rowData) => {
        const parseTime = (timeString) => {
            const [time, period] = timeString.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            const isPM = period ? period.toLowerCase() === 'pm' : '';
            const adjustedHours = isPM ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
            return new Date(2000, 0, 1, adjustedHours, parseInt(minutes, 10), parseInt(seconds, 10));
        };

        const inTime = parseTime(rowData.In);
        const outTime = parseTime(rowData.Out);

        if (isNaN(inTime) || isNaN(outTime)) {
            return 'Invalid time';
        }

        const timeDifference = outTime - inTime;

        if (timeDifference < 0) {
            return 'Invalid time range';
        }

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const formattedResult = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        return formattedResult;
    };



    const saveAsExcelFile = (buffer, fileName) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };



    const cols = [
        { field: 'id', header: 'User ID' },
        { field: 'name', header: 'Name' },
        { field: 'date', header: 'Date' },
        { field: 'In', header: 'In Time' },
        { field: 'Out', header: 'Out Time' },
        { field: 'Working Hours', header: 'Working hours', body: calculateWorkingHours },
    ];

    const filteredList = list.filter(item => item.id.startsWith('FD'));

    const dataForExport = filteredList.map(item => ({
        id: item.id,
        name: item.name,
        date: item.date,
        In: item.In,
        Out: item.Out,
        'Working Hours': calculateWorkingHours(item),
    }));


    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(dataForExport);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Front Desk Officer Attendance');
        });
    };





    useEffect(() => {
        axios.get('http://localhost:8080/attend/fetch')
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    useEffect(() => {
        setLoading(false);
        initFilters();
    }, [list]);

    const fetchData = () => {
        setLoading(true);
        const endpoint = 'http://localhost:8080/attend/fetch';

        axios.get(endpoint)
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const clearFilter = () => {
        initFilters();
        fetchData(); // Retrieve original data
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            name: { value: null, matchMode: 'startsWith' },
            date: { value: null, matchMode: 'equals' },
            id: { value: 'FD', matchMode: 'startsWith' }, // Set the initial value for 'id' filter
            In: { value: null, matchMode: 'equals' },
            Out: { value: null, matchMode: 'equals' },
        });
        setGlobalFilterValue('');
    };


    const renderHeader = () => {
        return (
            <div style={{ display: "flex" }} className="flex justify-content-between">

                <div>
                    <i style={{ fontSize: "15px", padding: "5px" }} className="pi pi-search" />
                    <InputText style={{ width: "190px", height: "30px", textAlign: "center", padding: "0px", fontSize: "13px", paddingTop: "1px" }} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </div>

                <div style={{ display: "flex", justifyContent: "space-evenly", width: "390px", marginBottom: "40px", marginLeft: "70px", marginTop: "10px" }}>

                    <Button id="cdbtn"
                        type="button"
                        label="Current Date"
                        outlined
                        onClick={() => {
                            let cur = new Date();
                            let cdate = cur.toLocaleDateString();
                            let cdata = list.filter((e) => e.date === cdate);
                            setList(cdata);
                        }}
                    />
                    <Button id="ydbtn"
                        type="button"
                        label="Yesterday"
                        outlined
                        onClick={() => {
                            let cur = new Date();
                            cur.setDate(cur.getDate() - 1);
                            let yesterday = cur.toLocaleDateString();
                            let filteredData = list.filter((e) => e.date === yesterday);
                            setList(filteredData);
                        }}
                    />
                    <Button id="cmbtn"
                        type="button"
                        label="Current Month"
                        outlined
                        onClick={() => {
                            let cur = new Date();
                            let cMon = cur.getMonth() + 1;
                            let cdata = list.filter((e) => {
                                let date = e.date;
                                let parts = date.split('/');
                                return parseInt(parts[1]) === cMon;
                            });
                            setList(cdata);
                        }}
                    />
                    <Button id="clrbtn"
                        type="button"
                        icon="pi pi-times"
                        className="p-button-danger"
                        outlined
                        onClick={clearFilter}
                    />

                </div>

                <Button style={{ position: "absolute", left: "650px", top: "-75px" }} type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />

            </div>
        );
    };



    return (
        <>


            <div className="doct card">
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable
                    value={list}
                    paginator
                    showGridlines
                    rows={10}
                    loading={loading}
                    dataKey="_id"
                    filters={filters}
                    globalFilterFields={['id']}
                    header={renderHeader()}
                    globalFilter={globalFilterValue}
                    emptyMessage="No data found."
                >
                    <Column className='abcd' field="id" header="User ID" filter filterPlaceholder="Search by ID" style={{ minWidth: '12rem' }} />
                    <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="date" header="Date" style={{ minWidth: '10rem' }} />
                    <Column field="In" header="In Time" style={{ minWidth: '10rem' }} />
                    <Column field="Out" header="Out Time" style={{ minWidth: '10rem' }} />
                    <Column field="Working Hours" header="Working hours" body={calculateWorkingHours} style={{ minWidth: '10rem' }} />

                </DataTable>
            </div>




        </>
    );
}
