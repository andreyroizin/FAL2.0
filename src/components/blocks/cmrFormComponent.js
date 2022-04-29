import React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ListOfPurposesOfCalls from '../../config/consts/listOfPurposesOfCallsConst';
import ListOfPorts from '../../config/JSON/listOfPorts'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    datePicker: {
        minWidth: 250,
        width: 250
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    formControlNoMargin2: {
        minWidth: 225,
        // minHeight: 60
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function PortForm({data, updateData, locationNumber}) {
    const classes = useStyles();

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            CMR information
        </Typography>


    </>
}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default PortForm;
