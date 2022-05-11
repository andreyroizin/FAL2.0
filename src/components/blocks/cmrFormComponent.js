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
import ListOfLanguages from "../../data/languages";
import ListOfCountries from "../../data/countries";
import {Editors} from "react-data-grid-addons";
import documentTypes from "../../functions/list_getters/documentTypesGetter";
import countryCodes from "../../functions/list_getters/countryCodes";
import ReactDataGrid from "react-data-grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    datePicker: {
        minWidth: 225,
        width: 225
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    formControlNoMargin2: {
        minWidth: 225,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },

    divisionLine:{
        background: 'black',
        color: 'black',
        borderColor: 'black',
        height: '3px',
        width:"100%",
        marginTop:"30px"
    }
}));
const {DropDownEditor} = Editors;
const documentTypesList = documentTypes.getDocumentsWithTypes();
const DocumentTypesEditor = <DropDownEditor options={documentTypesList}/>;

const documentsAttachedRows = [
    {key: "NR", name: "NR", editable: false, width: 50},
    {key: "Type", name: "Type", editable: true, editor: DocumentTypesEditor, width: 150},
    {key: "Remarks", name: "Remarks", editable: true, width: 150},
    // {key: "Net_weight", name: "Net weight", editable: true, width: 250},
];

function PortForm({data, updateData, locationNumber}) {
    const classes = useStyles();
    const emptyDiv = <div className={classes.formControlNoMargin} style={{height: '0px'}}/>

    function addRowDocumentsAttached() {
        console.log("adding row");
        let number = data.documentsAttached.length + 1
        let row = {NR: number}
        data.documentsAttached.push(row);
        updateData(data)
    }

    function deleteRowDocumentsAttached() {
        data.documentsAttached.pop();
        updateData(data)
    }

    function onGridRowsUpdatedDocumentsAttached({fromRow, toRow, updated}) {

        const documentsAttached = data.documentsAttached.slice();
        for (let i = fromRow; i <= toRow; i++) {
            documentsAttached[i] = {...documentsAttached[i], ...updated};
        }
        data.documentsAttached = documentsAttached;
        updateData(data)
    }

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            CMR information
        </Typography>
        <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>

            <Grid container  style={{}} item xs={6}>
                <Typography variant="h5" component="h5" gutterBottom align="center">
                    Sender details
                </Typography>

                <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                    <TextField
                        label="ID:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
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
                                <MenuItem key={index} value={language}>
                                    {`${ListOfLanguages[language].name}-  ${language}`}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                    <TextField
                        label="Name:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                </Grid>
                <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
                    Defined contract details
                </Typography>
                <Grid container justify={'space-between'} style={{marginTop: '10px'}}>

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
                </Grid>

                <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                    <TextField
                        label="Email:"
                        value={data.seller_person_name}
                        onChange={(e) => updateData({seller_person_name: e.target.value})}
                        variant="outlined"
                    />

                    <TextField
                        label="Postcode:"
                        value={data.seller_complete_number}
                        onChange={(e) => updateData({seller_complete_number: e.target.value})}
                        variant="outlined"
                    />
                </Grid>

                <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                    <TextField
                        label="Street:"
                        value={data.seller_person_name}
                        onChange={(e) => updateData({seller_person_name: e.target.value})}
                        variant="outlined"
                    />

                    <TextField
                        label="City:"
                        value={data.seller_complete_number}
                        onChange={(e) => updateData({seller_complete_number: e.target.value})}
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
                        value={data.seller_complete_number}
                        onChange={(e) => updateData({seller_complete_number: e.target.value})}
                        variant="outlined"
                    />
                </Grid>

            </Grid>
            <Grid container  style={{}} item xs={6}>
                <Typography variant="h5" component="h5" gutterBottom>
                    Document details
                </Typography>

                <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                    <TextField
                        label="Number of document:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        variant="outlined"
                    />

                    <TextField
                        label="Date of document"
                        type="date"
                        contentEditable={false}
                        className={classes.datePicker}
                        variant={'outlined'}
                        value={correctDateTime(data.date_of_document)}
                        onChange={(e) =>
                            updateData({date_of_document: e.target.value})}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                    <TextField
                        label="Remarks:"
                        value={data.invoice_id}
                        onChange={(e) => updateData({invoice_id: e.target.value})}
                        fullWidth
                        multiline
                        rowsMax={2}
                        variant="outlined"
                    />

                    {emptyDiv}
                </Grid>

            </Grid>

            <hr
                className={classes.divisionLine}
            />
            <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>

                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Consignee details
                    </Typography>

                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                        <TextField
                            label="ID:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
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
                                    <MenuItem key={index} value={language}>
                                        {`${ListOfLanguages[language].name}-  ${language}`}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                        <TextField
                            label="Name:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                    </Grid>
                    <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
                        Defined contract details
                    </Typography>
                    <Grid container justify={'space-between'} style={{marginTop: '10px'}}>

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
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Email:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="Postcode:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Street:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="City:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
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
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                </Grid>

                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Career details
                    </Typography>

                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                        <TextField
                            label="ID:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
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
                                    <MenuItem key={index} value={language}>
                                        {`${ListOfLanguages[language].name}-  ${language}`}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                        <TextField
                            label="Name:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                    </Grid>
                    <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
                        Defined contract details
                    </Typography>
                    <Grid container justify={'space-between'} style={{marginTop: '10px'}}>

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
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Email:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="Postcode:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Street:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="City:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
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
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                </Grid>
            </Grid>

            <hr
                className={classes.divisionLine}
            />
            <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Place and date of taking over the goods
                    </Typography>
                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                        <TextField
                            label="Date"
                            type="date"
                            contentEditable={false}
                            className={classes.datePicker}
                            variant={'outlined'}
                            value={correctDateTime(data.date_of_document)}
                            onChange={(e) =>
                                updateData({date_of_document: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Name:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                    </Grid>
                </Grid>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Successive Carrier details
                    </Typography>

                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                        <TextField
                            label="ID:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
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
                                    <MenuItem key={index} value={language}>
                                        {`${ListOfLanguages[language].name}-  ${language}`}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                        <TextField
                            label="Name:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                    </Grid>
                    <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
                        Defined contract details
                    </Typography>
                    <Grid container justify={'space-between'} style={{marginTop: '10px'}}>

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
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Email:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="Postcode:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'} style={{marginTop: '30px'}}>

                        <TextField
                            label="Street:"
                            value={data.seller_person_name}
                            onChange={(e) => updateData({seller_person_name: e.target.value})}
                            variant="outlined"
                        />

                        <TextField
                            label="City:"
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
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
                            value={data.seller_complete_number}
                            onChange={(e) => updateData({seller_complete_number: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                </Grid>

            </Grid>
            <hr
                className={classes.divisionLine}
            />
            <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Place and date of delivery the goods
                    </Typography>
                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>
                        <TextField
                            label="Date"
                            type="date"
                            contentEditable={false}
                            className={classes.datePicker}
                            variant={'outlined'}
                            value={correctDateTime(data.date_of_document)}
                            onChange={(e) =>
                                updateData({date_of_document: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Name:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
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

                    </Grid>
                </Grid>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Carriers reservations and observations:
                    </Typography>
                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>

                        <TextField
                            label="Reservation/observation:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                        <TextField
                            label="Reservation/observation:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                        <TextField
                            label="Reservation/observation:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <hr
                className={classes.divisionLine}
            />
            <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Documents attached
                    </Typography>
                    <ReactDataGrid
                        columns={documentsAttachedRows}
                        rowGetter={i => data.documentsAttached[i]}
                        rowsCount={data.documentsAttached.length}
                        onGridRowsUpdated={onGridRowsUpdatedDocumentsAttached}
                        enableCellSelect={true}

                    />
                    <Button variant="primary" startIcon={<AddIcon/>} onClick={addRowDocumentsAttached}>Add row</Button>
                    <Button variant="primary" startIcon={<DeleteOutlineIcon/>} onClick={deleteRowDocumentsAttached}>Delete row</Button>
                </Grid>
            </Grid>
            <hr
                className={classes.divisionLine}
            />
            <Grid container alignItems="flex-start" style={{marginTop: '10px'}} spacing={2}>
                <Grid container  style={{}} item xs={6}>
                    <Typography variant="h5" component="h5" gutterBottom align="center">
                        Supply Chain Consignment
                    </Typography>
                    <Grid container justify={'space-between'}style={{marginTop: '10px'}}>

                        <TextField
                            label="Gross weight (total):"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                        <TextField
                            label="Volume (total):"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid container justify={'space-between'}style={{marginTop: '30px'}}>
                        <TextField
                            label="COD amount:"
                            value={data.invoice_id}
                            onChange={(e) => updateData({invoice_id: e.target.value})}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <hr
                className={classes.divisionLine}
            />
        </Grid>




    </>
}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default PortForm;
