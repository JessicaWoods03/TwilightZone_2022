import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'

import FullReportPage from '../FullReportPage/FullReportPage';

import getReportData from '../../../utils/search_utils/getReportData';

export default function SearchPageResultsTable(props) {
    const goToReport = async (id) => {
        const report = await getReportData(id)
        setData(report)
        handleOpen()
        // setSelectedReport(id);
        // alert("This function will be called and will pass the ID to the report view page which will then retreieve data for that report")
    }

    const [data, setData] = React.useState();

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState();

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const goToReportButton = (id) => {
        return (<Button variant="contained"
            onClick={() => { goToReport(id) }}
        >Full Report</Button>)
    };

    // These fields can easily be modified as needed but the framework is there
    const columns = [
        { id: 'city', label: 'City', minWidth: 100 },
        { id: 'state', label: 'State', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 175 },
        { id: 'date', label: 'Date', minWidth: 80, align: 'right' },
        { id: '_id', format: (value) => goToReportButton(value) }
    ];


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [showFullReport, setShowFullReport] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.results
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.results.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FullReportPage
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
                data={data}
            ></FullReportPage>
        </>
    );
}