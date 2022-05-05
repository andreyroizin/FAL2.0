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
    const emptyDiv = <div className={classes.formControlNoMargin} style={{height: '0px'}}/>

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            CMR information
        </Typography>
        <Grid container style={{marginTop: '10px'}} spacing={2}>

            <Grid container  style={{}} item xs={6}>
                <Typography variant="h5" component="h5" gutterBottom align="center">
                    Sender details
                </Typography>

                <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                    <TextField
                        label="ID:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        variant="outlined"
                    />

                    <TextField
                        label="Name:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container  style={{}} item xs={6}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Document details
                </Typography>

                <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                    <TextField
                        label="Number of document:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        variant="outlined"
                    />

                    <TextField
                        label="Date of document"
                        type="datetime-local"
                        contentEditable={false}
                        className={classes.datePicker}
                        variant={'outlined'}
                        // margin={"normal"}
                        value={correctDateTime(data.date_of_document)}
                        onChange={(e) =>
                            updateData({date_of_document: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

            </Grid>

        </Grid>



        {/*<TextField*/}
        {/*    label="Number of document:"*/}
        {/*    value={data.invoice_id}*/}
        {/*    onChange={(e) => updateData({invoice_id: e.target.value})}*/}
        {/*    variant="outlined"*/}
        {/*/>*/}

        {/*<TextField*/}
        {/*    label="Date of document"*/}
        {/*    type="datetime-local"*/}
        {/*    contentEditable={false}*/}
        {/*    className={classes.datePicker}*/}
        {/*    variant={'outlined'}*/}
        {/*    margin={"normal"}*/}
        {/*    value={correctDateTime(data.date_of_document)}*/}
        {/*    onChange={(e) =>*/}
        {/*        updateData({date_of_document: e.target.value})}*/}
        {/*    InputLabelProps={{*/}
        {/*        shrink: true,*/}
        {/*    }}*/}
        {/*/>*/}

        {/*{emptyDiv}*/}

    </>
}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default PortForm;
