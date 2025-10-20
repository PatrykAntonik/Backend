import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listUsers} from "../../../actions/userActions";
import Box from "@mui/material/Box";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Loader from "../../Reusable/Loader";
import Message from "../../Reusable/Message";

function DonorsList() {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const {loading, error, users} = userList;

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    const columns = [
        {field: 'first_name', headerName: 'First Name', width: 170, headerClassName: 'super-app-theme--header'},
        {field: 'last_name', headerName: 'Last Name', width: 170, headerClassName: 'super-app-theme--header',},
        {field: 'email', headerName: 'Email', width: 220, headerClassName: 'super-app-theme--header',},
        {field: 'phone_number', headerName: 'Phone Number', width: 170, headerClassName: 'super-app-theme--header',},
        {field: 'city', headerName: 'City', width: 170, headerClassName: 'super-app-theme--header',},
        {field: 'zip_code', headerName: 'Zip Code', width: 170, headerClassName: 'super-app-theme--header',},
    ];

    return (
        loading ? <Loader/> :
            error ? <Message severity="error">{error}</Message> :
                <Box mt={2} sx={{
                    height: 600, width: '100%', '& .super-app-theme--header': {
                        textTransform: 'uppercase',
                    },
                }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        sx={{
                            borderRadius: 5,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: 'black',
                            fontSize: '1rem',
                            borderColor: 'rgba(0,0,0,0.2)',
                        }}
                        autoHeight
                        pageSize={5}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
    );
}

export default DonorsList;
