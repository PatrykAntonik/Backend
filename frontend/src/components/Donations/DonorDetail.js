import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function DonorDetail() {
    const { id } = useParams();
    const [donor, setDonor] = useState([]);

    useEffect(() => {
        async function fetchDonor() {
            const {data} = await axios.get(`/api/donors/${id}`)
            setDonor(data);
        }
        fetchDonor();
    }, []);

  return (
    <Box>
      <Typography variant="h5">{donor.city}</Typography>
    </Box>
  );
}

export default DonorDetail;
