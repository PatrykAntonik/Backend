import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loader from "../Reusable/Loader";
import Message from "../Reusable/Message";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {ListQuestion} from "../../actions/donationActions";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function Questions() {
    const dispatch = useDispatch();
    const questionList = useSelector((state) => state.question);
    const {loading: loadingQuestions, error: errorQuestions, questions} = questionList;
    const [donationType, setDonationType] = useState(0);

    useEffect(() => {
        // Assuming ListQuestion takes a string argument like 'blood' or 'marrow'
        dispatch(ListQuestion(donationType === 0 ? 'blood' : 'marrow'));
    }, [dispatch, donationType]);

    const handleTabChange = (event, newValue) => {
        setDonationType(newValue);
    };

    return (
        <Box>
            <Typography variant="h4" component="h2" sx={{marginBottom: "1rem", marginTop: "1rem"}}>
                Questions for Donations
            </Typography>

            <Tabs
                value={donationType}
                onChange={handleTabChange}
            >
                <Tab label="Blood"/>
                <Tab label="Marrow"/>
            </Tabs>

            {loadingQuestions ? <Loader/> :
                errorQuestions ? <Message severity="error">{errorQuestions}</Message> :
                    <List sx={{width: '100%', bgcolor: 'background.paper'}} component="nav" aria-label="questions list">
                        {questions && questions.length > 0 ? (
                            questions.map((question, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <QuestionMarkIcon/>
                                            </ListItemIcon>
                                            <ListItemText sx={{textAlign: 'left', marginLeft:'50px'}} primary={`${question.text}`}/>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider/>
                                </React.Fragment>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No questions found for this donation type."/>
                            </ListItem>
                        )}
                    </List>
            }
        </Box>
    );
}

export default Questions;
