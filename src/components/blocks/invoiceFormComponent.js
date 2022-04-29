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
import ListOfLanguages from '../../data/languages'

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
            Invoice information
        </Typography>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Sender details
        </Typography>

        <Grid container justify={'space-between'}>

            <TextField
                label="ID:"
                value={data.id}
                onChange={(e) => updateData({id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Name:"
                value={data.name}
                onChange={(e) => updateData({name: e.target.value})}
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Language</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.language}
                    onChange={(e) => {
                        updateData({language: e.target.value})
                    }}
                >
                    {/*{ListOfLanguages.map((language, index) =>*/}
                    {/*    <MenuItem key={index} value={language.name}>*/}
                    {/*        {`${language.name}`}*/}
                    {/*    </MenuItem>*/}
                    {/*)}*/}
                </Select>
            </FormControl>

        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Tax Registration ID:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Registered Tax/TypeCode:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Defined contract details
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Name:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Mobile telefone:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Email:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Postcode:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Street:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="City:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Country</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.language}
                    onChange={(e) => {
                        updateData({language: e.target.value})
                    }}
                >
                    {/*{ListOfLanguages.map((language, index) =>*/}
                    {/*    <MenuItem key={index} value={language.name}>*/}
                    {/*        {`${language.name}`}*/}
                    {/*    </MenuItem>*/}
                    {/*)}*/}
                </Select>
            </FormControl>

            <TextField
                label="Country subdivision:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Buyer details
        </Typography>

        <Grid container justify={'space-between'}>

            <TextField
                label="ID:"
                value={data.id}
                onChange={(e) => updateData({id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Name:"
                value={data.name}
                onChange={(e) => updateData({name: e.target.value})}
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Language</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.language}
                    onChange={(e) => {
                        updateData({language: e.target.value})
                    }}
                >
                    {/*{ListOfLanguages.map((language, index) =>*/}
                    {/*    <MenuItem key={index} value={language.name}>*/}
                    {/*        {`${language.name}`}*/}
                    {/*    </MenuItem>*/}
                    {/*)}*/}
                </Select>
            </FormControl>

        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Tax Registration ID:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Registered Tax/TypeCode:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Defined contract details
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Name:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Mobile telefone:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Email:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Postcode:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Street:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="City:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Country</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.language}
                    onChange={(e) => {
                        updateData({language: e.target.value})
                    }}
                >
                    {/*{ListOfLanguages.map((language, index) =>*/}
                    {/*    <MenuItem key={index} value={language.name}>*/}
                    {/*        {`${language.name}`}*/}
                    {/*    </MenuItem>*/}
                    {/*)}*/}
                </Select>
            </FormControl>

            <TextField
                label="Country subdivision:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            {emptyDiv}
        </Grid>

    </>
}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default PortForm;
