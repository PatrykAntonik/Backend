import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {listDonations} from "../../../actions/donationActions";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Loader from "../../Reusable/Loader";
import Message from "../../Reusable/Message";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function DonationsList() {
    const dispatch = useDispatch();
    const donationList = useSelector((state) => state.donationList);
    const {loading, error, donations} = donationList;

    useEffect(() => {
        dispatch(listDonations());
    }, [dispatch]);

    const columns = [
        {field: 'donation_type', headerName: 'Donation Type', width: 150},
        {field: 'date', headerName: 'Date of donation', width: 150},
        {
            field: 'donor_first_name',
            headerName: 'First Name',
            width: 160,
            renderCell: (params) => params.row.donor.first_name
        },
        {
            field: 'donor_last_name',
            headerName: 'Last Name',
            width: 160,
            renderCell: (params) => params.row.donor.last_name
        },
        {
            field: 'donor_city',
            headerName: 'City',
            width: 160,
            renderCell: (params) => params.row.donor.city
        },
        {
            field: 'donor_zipCode',
            headerName: 'Zip Code',
            width: 160,
            renderCell: (params) => params.row.donor.zip_code
        },
        {
            field: 'details',
            headerName: 'Details',
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Button
                    component={Link}
                    variant="text"
                    to={`/donation/${params.row.id}`}
                    color="info"
                >
                    Details
                </Button>
            )
        },
    ];

    const initialFilterState = {
        filter: {
            filterModel: {
                items: [],
            },
        },
    };

    return (
        loading ? <Loader/> :
            error ? <Message severity="error">{error}</Message> :
                <Box mt={2} sx={{height: 600, width: '100%'}}>
                    <DataGrid
                        rows={donations}
                        columns={columns}
                        pageSize={5}
                        initialState={initialFilterState}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
    );
}

export default DonationsList;
