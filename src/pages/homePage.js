import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {DataGrid} from '@material-ui/data-grid';
import shipCallsData from './../config/JSON/shipCallsData.json'


console.log('COlumn data: ', shipCallsData)
const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {
        field: 'TruckNumber',
        headerName: 'Truck number',
        width: 200,
    },
    {
        field: 'Country',
        headerName: 'Country',
        width: 200,
    },
    {
        field: 'DocumentNumber',
        headerName: '№ of document',
        width: 200,
    },
    {
        field: 'DateOfDocument',
        headerName: 'Date of document',
        width: 200,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    uploadFile: {
        display: 'none'
    }
}));

export default function HomePage({history}) {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify={'space-between'}>
                        <Typography variant="h6">
                            Прототип Українського Морського Єдиного Вікна<br/>Ukrainian Maritime Single Window Prototype
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Toolbar/>

                <Grid container style={{marginTop: '10px'}} justify={'center'}>
                    <Typography variant="h5">
                        Перелік суднозаходів / Ship calls
                    </Typography>
                </Grid>

                <Grid container style={{marginTop: '30px'}} justify={'center'}>

                    <div style={{width: '905px', height: '300px', align:'center'}}>
                        <DataGrid
                            rows={shipCallsData}
                            columns={columns}
                            pageSize={4}
                            onRowClick={(e) => {
                                history.push(`/details/${e.id}`);
                            }}
                            disableSelectionOnClick
                        />
                    </div>
                </Grid>

                <Grid container style={{marginTop: '20px'}} justify={'center'}>
                    <Typography style={{width: '900px'}} variant="p">
                        Prototype is aimed to help public authorities implement electronic information exchange systems.
                        <br/><br/>
                        Prototype implements the Annex to the Convention on the Facilitation of International Navigation
                        of 1965, approved by International Maritime Organization Resolution FAL.12 (40), Standard
                        1.3bis, based on UN/CEFACT MMT reference data model (RDM) and refers to the European Union’s
                        Maritime Single Window Environment (of the European Maritime Safety Agency, EMSA) requirements.
                    </Typography>
                </Grid>
            </main>
        </div>
    )
}