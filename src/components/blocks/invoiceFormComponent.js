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
import AddIcon from '@material-ui/icons/Add';
import ListOfLanguages from '../../data/languages'
import ListOfCountries from '../../data/countries'
import ListOfCurrencies from '../../data/currencies'
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
                value={data.seller_id}
                onChange={(e) => updateData({seller_id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Name:"
                value={data.seller_name}
                onChange={(e) => updateData({seller_name: e.target.value})}
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Language</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.seller_language_code}
                    onChange={(e) => {
                        updateData({seller_language_code: e.target.value})
                    }}
                >
                    {Object.keys(ListOfLanguages).map((language, index) =>
                        <MenuItem key={index} value={ListOfLanguages[language].name}>
                            {`${language} - ${ListOfLanguages[language].name}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Tax Registration ID:"
                value={data.seller_tax_id}
                onChange={(e) => updateData({seller_tax_id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Registered Tax/TypeCode:"
                value={data.seller_tax_type_code}
                onChange={(e) => updateData({seller_tax_type_code: e.target.value})}
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
                value={data.seller_person_name}
                onChange={(e) => updateData({seller_person_name: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Mobile telefone:"
                value={data.seller_complete_number}
                onChange={(e) => updateData({seller_complete_number: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Email:"
                value={data.seller_email}
                onChange={(e) => updateData({seller_email: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Postcode:"
                value={data.seller_postcode}
                onChange={(e) => updateData({seller_postcode: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Street:"
                value={data.seller_street_name}
                onChange={(e) => updateData({seller_street_name: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="City:"
                value={data.seller_city_name}
                onChange={(e) => updateData({seller_city_name: e.target.value})}
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
                    value={data.seller_country_code}
                    onChange={(e) => {
                        updateData({seller_country_code: e.target.value})
                    }}
                >
                    {Object.keys(ListOfCountries).map((country, index) =>
                        <MenuItem key={index} value={country}>
                            {`${country} - ${ListOfCountries[country]}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            <TextField
                label="Country subdivision:"
                value={data.seller_country_subdivision_name}
                onChange={(e) => updateData({seller_country_subdivision_name: e.target.value})}
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
                value={data.buyer_id}
                onChange={(e) => updateData({buyer_id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Name:"
                value={data.buyer_name}
                onChange={(e) => updateData({buyer_name: e.target.value})}
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Language</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.buyer_language_code}
                    onChange={(e) => {
                        updateData({buyer_language_code: e.target.value})
                    }}
                >
                    {Object.keys(ListOfLanguages).map((language, index) =>
                        <MenuItem key={index} value={ListOfLanguages[language].name}>
                            {`${language} - ${ListOfLanguages[language].name}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Tax Registration ID:"
                value={data.buyer_tax_id}
                onChange={(e) => updateData({buyer_tax_id: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Registered Tax/TypeCode:"
                value={data.buyer_tax_type_code}
                onChange={(e) => updateData({buyer_tax_type_code: e.target.value})}
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
                value={data.buyer_person_name}
                onChange={(e) => updateData({buyer_person_name: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Mobile telefone:"
                value={data.buyer_complete_number}
                onChange={(e) => updateData({buyer_complete_number: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Email:"
                value={data.buyer_email}
                onChange={(e) => updateData({buyer_email: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

            <TextField
                label="Postcode:"
                value={data.buyer_postcode}
                onChange={(e) => updateData({buyer_postcode: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Street:"
                value={data.buyer_street_name}
                onChange={(e) => updateData({buyer_street_name: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="City:"
                value={data.buyer_city_name}
                onChange={(e) => updateData({buyer_city_name: e.target.value})}
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
                    value={data.buyer_country_code}
                    onChange={(e) => {
                        updateData({buyer_country_code: e.target.value})
                    }}
                >
                    {Object.keys(ListOfCountries).map((country, index) =>
                        <MenuItem key={index} value={country}>
                            {`${country} - ${ListOfCountries[country]}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            <TextField
                label="Country subdivision:"
                value={data.buyer_country_subdivision_name}
                onChange={(e) => updateData({buyer_country_subdivision_name: e.target.value})}
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
                value={correctDateTime(data.occurrence)}
                onChange={(e) =>
                    updateData({occurrence: e.target.value})}
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
                    {ListOfCurrencies.map((currency, index) =>
                        <MenuItem key={index} value={currency.cc}>
                            {`${currency.cc} - ${currency.name}`}
                        </MenuItem>
                    )}
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
