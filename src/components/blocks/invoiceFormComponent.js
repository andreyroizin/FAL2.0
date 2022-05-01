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
import ReactDataGrid from "react-data-grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import countryCodes from "../../functions/countryCodes";
import {Editors} from "react-data-grid-addons";

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
const {DropDownEditor} = Editors;
const countryCodesList = countryCodes.getCountriesWithCodes();
countryCodesList.unshift("(...)")
const CountryCodesEditor = <DropDownEditor options={countryCodesList}/>;

const tradeLineItemsColumns = [
    {key: "NR", name: "NR", editable: false, width: 50},
    {key: "Name", name: "Name", editable: true, width: 150},
    {key: "Description", name: "Description", editable: true, width: 250},
    {key: "Net_weight", name: "Net weight", editable: true, width: 150},
    {key: "Gross_weight", name: "Gross weight", editable: true, width: 150},
    {key: "Class_code", name: "Class Code", editable: true, width: 150},
    {key: "Origin_country", name: "Origin  Country", editable: true, editor: CountryCodesEditor, width: 150},
    {key: "Charge_amount", name: "Charge Amount", editable: true, width: 150},
    {key: "Basis_quantity", name: "Basis Quantity", editable: true, width: 150},
    {key: "Billed_quantity", name: "Billed Quantity", editable: true, width: 150},
    {key: "Total_amount", name: "Total Amount", editable: true, width: 150},
    {key: "Tax_total_amount", name: "Tax Total Amount", editable: true, width: 150},
    {key: "Net_total_amount", name: "Net Total Amount", editable: true, width: 150},
];

function PortForm({data, updateData, locationNumber}) {
    const classes = useStyles();
    const emptyDiv = <div className={classes.formControlNoMargin} style={{height: '0px'}}/>

    function addRow() {
        console.log("adding row");
        let number = data.tradeLineItems.length + 1
        let row = {NR: number}
        data.tradeLineItems.push(row);
        updateData(data)
    }

    function deleteRow() {
        data.tradeLineItems.pop();
        updateData(data)
    }

    function onGridRowsUpdated({fromRow, toRow, updated}) {

        const tradeLineItems = data.tradeLineItems.slice();
        for (let i = fromRow; i <= toRow; i++) {
            tradeLineItems[i] = {...tradeLineItems[i], ...updated};
        }
        data.tradeLineItems = tradeLineItems;
        updateData(data)
    }


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

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Trade line items
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>
        <ReactDataGrid
            columns={tradeLineItemsColumns}
            rowGetter={i => data.tradeLineItems[i]}
            rowsCount={data.tradeLineItems.length}
            onGridRowsUpdated={onGridRowsUpdated}
            enableCellSelect={true}

        />
        </Grid>

        <Button variant="primary" startIcon={<AddIcon/>} onClick={addRow}>Add row</Button>
        <Button variant="primary" startIcon={<DeleteOutlineIcon/>} onClick={deleteRow}>Delete row</Button>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Related Consignment
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Gross Weight:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Net Weight:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Package Quantity:"
                value={data.registeredTax}
                onChange={(e) => updateData({registeredTax: e.target.value})}
                variant="outlined"
            />
        </Grid>


        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Used  Logistics  Transport Means:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Occurrence"
                type="datetime-local"
                contentEditable={false}
                className={classes.datePicker}
                variant={'outlined'}
                margin={"normal"}
                value={correctDateTime(data.ETDPortOfCall)}
                onChange={(e) =>
                    updateData({ETDPortOfCall: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {emptyDiv}
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Due Payable  Amount:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Currency</InputLabel>

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

            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Payee Party. Creditor Financial Account
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="IBAN:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Account:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />
            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Trade Tax
        </Typography>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Exemption Reason Code:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Trade Payment Terms:"
                value={data.taxID}
                onChange={(e) => updateData({taxID: e.target.value})}
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
