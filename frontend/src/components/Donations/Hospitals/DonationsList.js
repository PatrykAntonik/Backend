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
        {field: 'donation_type', headerName: 'Donation Type', width: 150, headerClassName: 'super-app-theme--header',},
        {field: 'date', headerName: 'Date of donation', width: 180, headerClassName: 'super-app-theme--header',},
        {
            field: 'donor_first_name',
            headerName: 'First Name',
            headerClassName: 'super-app-theme--header',
            width: 160,
            renderCell: (params) => params.row.donor.first_name
        },
        {
            field: 'donor_last_name',
            headerName: 'Last Name',
            headerClassName: 'super-app-theme--header',
            width: 160,
            renderCell: (params) => params.row.donor.last_name
        },
        {
            field: 'donor_city',
            headerName: 'City',
            headerClassName: 'super-app-theme--header',
            width: 160,
            renderCell: (params) => params.row.donor.city
        },
        {
            field: 'donor_zipCode',
            headerName: 'Zip Code',
            headerClassName: 'super-app-theme--header',
            width: 160,
            renderCell: (params) => params.row.donor.zip_code
        },
        {
            field: 'details',
            headerName: 'Details',
            headerClassName: 'super-app-theme--header',
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
                <Box mt={2} sx={{
                    height: 600,
                    width: '100%',
                    '& .super-app-theme--header': {
                        textTransform: 'uppercase',
                    },
                }}>
                    <DataGrid
                        rows={donations}
                        sx={{
                            borderRadius: 5,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            fontSize: '1rem',
                            borderColor: 'rgba(0,0,0,0.2)',
                        }}
                        columns={columns}
                        autoHeight
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
