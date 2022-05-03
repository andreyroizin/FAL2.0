import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ShipFormComponent from "../components/blocks/shipFormComponent";
import PortForm from "../components/blocks/portFormComponent";
import VoyageForm from "../components/blocks/voyageFormComponent";
import CrewForm from "../components/blocks/crewFormComponent";
import Button from '@material-ui/core/Button';
import {config} from "../config/shipDetailsConfig";
import defaultDataConst from "../config/consts/defaultDataConst";
import listOfOptionsConst from "../config/consts/listOfOptionsConst";
import readXML from "../functions/readXML/readXML";
import {makeStyles} from "@material-ui/core/styles";
import readXLS from "../functions/readExcel/readXLSParent";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
import PassengersForm from "../components/blocks/passengersFormComponent";
import createXML from "../functions/generateXML/generateXML";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HealthFormComponent from "../components/blocks/healthFormComponent";
import ShipStoresForm from "../components/blocks/shipStoresFormComponent";
import CrewEffectsForm from "../components/blocks/crewEffectsFormComponent";
import CargoForm from "../components/blocks/cargoFormComponent";
import SecurityFormComponent from "../components/blocks/securityFormComponent";
import DPGForm from "../components/blocks/dpgFormComponent";
import WasteFormComponent from "../components/blocks/WasteFormComponent";
import _ from 'underscore'
import MainPageInfo from './../config/JSON/shipCallsData.json'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CMRFormComponent from "../components/blocks/cmrFormComponent";
import InvoiceFormComponent from "../components/blocks/invoiceFormComponent";
const listOfOptions = listOfOptionsConst;


const defaultOption = 'Invoice';

const drawerWidth = config.showDrawerIcons ? 200 : 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        // height: 70
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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

function CarDetails({history}) {
    const location = history.location.pathname;
    let locationNumber = parseInt(location.split('/')[2]);
    locationNumber--;
    const classes = useStyles();
    const [activeItem, setActiveItem] = useState(listOfOptions.indexOf(listOfOptions.find(el => el.label === defaultOption)));

    const [data, setData] = useState(() => {
    //     let portOfCall = MainPageInfo[locationNumber].portCall;
    //     let eta = MainPageInfo[locationNumber].ETA;
    //     if (eta.split('.').length !== 0) {
    //         let dates = eta.split('.');
    //         if (dates[0].length !== 2) {
    //             eta = `${dates[0]}-${dates[1]}-${dates[2]}T00:00`;
    //         } else {
    //             eta = `${dates[2]}-${dates[1]}-${dates[0]}T00:00`;
    //         }
    //     }
    //     let companyName = MainPageInfo[locationNumber].agent;
    //     let imo = MainPageInfo[locationNumber].imo;
    //     let ship = MainPageInfo[locationNumber].ship;
    //
        const def = defaultDataConst;
    //     def.port.portOfCall = portOfCall;
    //     def.port.ETAPortOfCall = eta;
    //     def.port.agent.company = companyName;
    //     def.ship.name = ship;
    //     def.ship.IMOnumber = imo;
        return def
    });
    const [openErrorDialog, setOpenErrorDialog] = useState({open: false, error: {}});
    const [uploadAnchorEl, setUploadAnchorEl] = React.useState(null);
    const [downloadAnchorEl, setDownloadAnchorEl] = React.useState(null);
    const handleUploadClick = (event) => {
        setUploadAnchorEl(event.currentTarget);
    };
    const handleDownloadClick = (event) => {
        setDownloadAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setUploadAnchorEl(null);
        setDownloadAnchorEl(null);
    };

    console.log("All the data FROM PARENT!!", data);
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify={'space-between'}>
                        <Typography variant="h6">
                            Прототип Українського Морського Єдиного Вікна<br/>Ukrainian Maritime Single Window Prototype
                        </Typography>
                        <div>
                            <Grid container justify={'flex-end'} style={{marginTop: '12px'}}>
                                <Button
                                    aria-controls="upload-menu"
                                    style={{marginRight: '30px'}}
                                    variant="contained"
                                    startIcon={<CloudUploadIcon/>}
                                    aria-haspopup="true"
                                    onClick={handleUploadClick}
                                >
                                    Upload
                                </Button>
                                <Menu
                                    id="upload-menu"
                                    anchorEl={uploadAnchorEl}
                                    keepMounted
                                    open={Boolean(uploadAnchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <label htmlFor="read-invoice-xml-file">Upload XML document</label>
                                    </MenuItem>
                                    {/*<MenuItem onClick={handleClose}>*/}
                                    {/*    <label htmlFor="excel-file">Upload Excel document</label>*/}
                                    {/*</MenuItem>*/}
                                </Menu>
                                <Button
                                    aria-controls="download-menu"
                                    startIcon={<GetAppIcon/>}
                                    aria-haspopup="true"
                                    onClick={handleDownloadClick}
                                    variant="contained"
                                >
                                    Download
                                </Button>
                                <Menu
                                    id="download-menu"
                                    anchorEl={downloadAnchorEl}
                                    keepMounted
                                    open={Boolean(downloadAnchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        createXML(data, () => {}, false,"invoice")
                                        handleClose();
                                    }}>Save Invoice to XML (as draft)</MenuItem>
                                    <MenuItem onClick={() => {
                                        const onError = (errors) => {
                                            let missingFields = [];
                                            for (let block in errors) {
                                                if (!errors.hasOwnProperty(block) || _.isEmpty(errors['' + block])) continue;
                                                missingFields.push(`Block ${block}:`);
                                                for (let field in errors['' + block]) {
                                                    if (!errors['' + block].hasOwnProperty(field)) continue;
                                                    if (typeof errors[block][field] === typeof true) {
                                                        missingFields.push(`→  ${field} is empty`);
                                                    } else {
                                                        missingFields.push(`→  ${field} columns are empty`);
                                                    }
                                                }
                                                missingFields.push("");
                                            }
                                            setOpenErrorDialog({
                                                open: true,
                                                error: {
                                                    title: "Please fill in required fields first: ",
                                                    text: missingFields
                                                }
                                            })
                                        }
                                   createXML(data, onError, true,"invoice");
                                      handleClose();
                                    }}>Generate full invoice XML file</MenuItem>
                                </Menu>
                            </Grid>
                            <input
                                className={classes.uploadFile}
                                onChange={() => {
                                    console.log("HERE !!!!!!!!")
                                    const file = document.getElementById("read-invoice-xml-file").files[0];
                                    const reader = new FileReader();

                                    reader.onload = (() => {
                                        console.log("HERE !!!!!!!!")
                                        try {
                                            let {
                                                invoice
                                            } = readXML(reader.result,'invoice');
                                            let dataCopy = JSON.parse(JSON.stringify(data));

                                            setData({
                                                ...dataCopy, ...{
                                                    invoice
                                                }
                                            });
                                        } catch (e) {
                                            setOpenErrorDialog({
                                                open: true, error: {
                                                    title: 'Error while reading XML',
                                                    text: [e]
                                                }
                                            })
                                            console.error(e);
                                        }
                                    })
                                    reader.readAsText(file);
                                }}
                                id="read-invoice-xml-file"
                                type="file"
                            />
                            {/*<input*/}
                            {/*    className={classes.uploadFile}*/}
                            {/*    id="excel-file"*/}
                            {/*    multiple*/}
                            {/*    onChange={() => {*/}
                            {/*        const files = document.getElementById("excel-file").files;*/}

                            {/*        try {*/}
                            {/*            readXLS(files, setOpenErrorDialog, (item) => {*/}
                            {/*                let dataCopy = data;*/}
                            {/*                dataCopy = {...dataCopy, ...{item}}*/}
                            {/*                setData(dataCopy)*/}
                            {/*            });*/}
                            {/*        } catch (e) {*/}
                            {/*            console.log("catch")*/}
                            {/*            setOpenErrorDialog({*/}
                            {/*                open: true, error: {*/}
                            {/*                    title: 'Error while reading XLS',*/}
                            {/*                    text: e*/}
                            {/*                }*/}
                            {/*            })*/}
                            {/*            console.error(e);*/}
                            {/*        }*/}


                            {/*    }}*/}
                            {/*    type="file"*/}
                            {/*/>*/}
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        {listOfOptions.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                color={'success'}
                                selected={activeItem === index}
                                onClick={() => {
                                    setActiveItem(index)
                                }}>

                                {(config.showDrawerIcons && item.icon) && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <ListItemText primary={item.label}/>

                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {getChildComponent(activeItem, [data, setData])}
            </main>

            <Dialog
                open={openErrorDialog.open}
                onClose={() => setOpenErrorDialog({
                    open: false,
                    error: {text: []}
                })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{openErrorDialog.error.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            (Array.isArray(openErrorDialog.error.text))
                                ?
                                openErrorDialog.error.text.map((el) => <>{el}<br/></>)
                                : openErrorDialog.error.text
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenErrorDialog({
                            open: false,
                            error: {}
                        })}
                        color="primary" autoFocus>
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function getChildComponent(activeItem, [data, setData]) {
    let selectedItem = listOfOptions[activeItem].value;

    switch (selectedItem) {
        case 'cmr':
            return <CMRFormComponent data={[data.cmr]} updateData={(dataItem) => {
                setData({...data, cmr: {...data.cmr, ...dataItem}})
            }}/>
        case 'invoice':
            return <InvoiceFormComponent data={data.invoice} updateData={(dataItem) => {
                setData({...data, invoice: {...data.invoice, ...dataItem}})
            }}/>
    //     case 'voyage':
    //         return <VoyageForm data={data.voyage} updateData={(dataItem) => {
    //             setData({...data, voyage: {...data.voyage, ...dataItem}})
    //         }}/>
    //     case 'crew':
    //         return <CrewForm data={data.crew} updateData={(dataItem) => {
    //             setData({...data, crew: {...data.crew, ...dataItem}})
    //         }}/>
    //     case 'passengers':
    //         return <PassengersForm data={data.passengers} updateData={(dataItem) => {
    //             setData({...data, passengers: {...data.passengers, ...dataItem}});
    //         }}/>
    //     case 'ship_stores':
    //         return <ShipStoresForm data={data.shipStores} updateData={(dataItem) => {
    //             setData({...data, shipStores: {...data.shipStores, ...dataItem}});
    //         }}/>
    //     case 'crew_effects':
    //         return <CrewEffectsForm data={data.crewEffects} crewData={data.crew} updateData={(dataItem) => {
    //             setData({...data, crewEffects: {...data.crewEffects, ...dataItem}})
    //         }}/>
    //     case 'cargo':
    //         return <CargoForm data={data.cargo} updateData={(dataItem) => {
    //             setData({...data, cargo: {...data.cargo, ...dataItem}});
    //         }}/>
    //     case 'health':
    //         return <HealthFormComponent
    //             data={data.health}
    //             crewData={data.crew}
    //             passengerData={data.passengers}
    //             updateData={(dataItem) => {
    //                 let health = JSON.parse(JSON.stringify(data.health))
    //                 setData({...data, health: {...health, ...dataItem}});
    //             }}/>
    //     case 'dangerous_goods':
    //         return <DPGForm
    //             data={data.dpg}
    //             cargoData={data.cargo}
    //             updateData={(dataItem) => {
    //                 let dpg = JSON.parse(JSON.stringify(data.dpg))
    //                 setData({...data, dpg: {...dpg, ...dataItem}});
    //             }}/>
    //     case 'security':
    //         return <SecurityFormComponent
    //             data={data.security}
    //             updateData={(dataItem) => {
    //                 let security = JSON.parse(JSON.stringify(data.security));
    //                 setData({...data, security: {...security, ...dataItem}});
    //             }}/>
    //     case 'waste':
    //         return <WasteFormComponent
    //             data={data.waste}
    //             updateData={(dataItem) => {
    //                 let waste = JSON.parse(JSON.stringify(data.waste));
    //                 setData({...data, waste: {...waste, ...dataItem}});
    //             }}/>
        default:
            return <h1>Not supported yet</h1>
    }
}

if (config.addOnCloseEvent) {
    window.onload = function () {
        window.addEventListener("beforeunload", function (e) {
            const confirmationMessage = 'It looks like you have been editing something. '
                + 'If you leave before saving, your changes will be lost.';

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        });
    };
}
export default CarDetails;