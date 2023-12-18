import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listUsers} from "../../../actions/userActions";
import Box from "@mui/material/Box";
import {DataGrid} from '@mui/x-data-grid';
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
        {field: 'first_name', headerName: 'First Name', width: 170},
        {field: 'last_name', headerName: 'Last Name', width: 170},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone_number', headerName: 'Phone Number', width: 170},
        {field: 'city', headerName: 'City', width: 170},
        {field: 'zip_code', headerName: 'Zip Code', width: 170},
    ];

    return (
        loading ? <Loader/> :
            error ? <Message severity="error">{error}</Message> :
                <Box mt={2} sx={{height: 600, width: '100%'}}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={5}
                    />
                </Box>
    );
}

export default DonorsList;
