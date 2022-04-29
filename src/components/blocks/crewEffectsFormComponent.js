import React, {useState} from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import unitList from "../../config/consts/unitList";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const UnitEditor = <DropDownEditor options={unitList}/>;


const columns = [
    {key: "NR", name: "NR", editable: true},
    {key: "Family_name", name: "Family name", editable: false},
    {key: "Given_name", name: "Given name", editable: false},
    {key: "Rank_of_rating", name: "Rank of rating", editable: false},
    {key: "Effects_description", name: "Effects description", editable: true},
    {key: "Quantity", name: "Quantity", editable: true},
    {key: "Unit", name: "Unit", editable: true, editor: UnitEditor}
];

function CrewEffectsForm({data, crewData, updateData}) {
    const [openAlert, setOpenAlert] = useState({open: false, error: "", severity: 'error'});

    function addRow() {
        console.log("adding row");
        let row = {}
        data.rows.push(row);
        updateData(data)
    }

    function deleteRow() {
        data.rows.pop();
        updateData(data)
    }

    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Crew effects
            </Typography>
            {/*The Alerts*/}
            <Collapse in={openAlert.open} style={{marginTop: '30px'}}>
                <Alert
                    severity={openAlert.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert({open: false, error: "", severity: 'error'});
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {openAlert.error}
                </Alert>
            </Collapse>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={({fromRow, toRow, updated}) => {
                    console.log('From row:', fromRow, 'to row: ', toRow, 'and updated: ', updated)
                    const rows = data.rows;

                    for (let i = fromRow; i <= toRow; i++) {
                        let item = rows[i];
                        if (updated.hasOwnProperty("NR")) {
                            item.NR = updated.NR;

                            let crewItem = crewData.rows.find(function (element) {
                                return parseInt(element.NR) === parseInt(item.NR)
                            });
                            console.log("crewItem ", crewItem)
                            if (!crewItem) {
                                item.NR = '';
                                item.Family_name = '';
                                item.Given_name = '';
                                item.Rank_of_rating = '';
                                setOpenAlert({
                                    open: true,
                                    error: "Crew member with number " + item.NR
                                        + " does not exist. Please provide NR with correct number reference of crew member",
                                    severity: 'error'
                                })
                                setTimeout(() => setOpenAlert({open: false, error: "", severity: 'error'}), 5000);
                                item = {...item, ...updated};
                                continue;
                            } else {
                                item.Family_name = crewItem.Family_name;
                                item.Given_name = crewItem.Given_name;
                                item.Rank_of_rating = crewItem.Rank_of_rating;
                                console.log("item modified ", item)
                                item = {...item, ...updated};
                            }

                        } else {
                            item = {...item, ...updated};
                        }
                        rows[i] = item;
                    }
                    updateData({rows: rows})

                }}
                enableCellSelect={true}
                columnAutoWidth="true"

            />
            <Button variant="primary" startIcon={<AddIcon/>} onClick={addRow}>Add row</Button>
            <Button variant="primary" startIcon={<DeleteOutlineIcon/>} onClick={deleteRow}>Delete row</Button>
        </div>
    );

}


export default withStyles(styles)(CrewEffectsForm);