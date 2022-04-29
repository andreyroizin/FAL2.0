import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'
import format from "./formatDropdownListValue";

function readXLSCargo(file, onSave) {
    data.cargo.rows = [];
    data.cargo.portOfLoading = '';
    data.cargo.portOfDischarge = '';
    data.dpg.rows = [];
    let cargo = data.cargo;
    let dpg = data.dpg;
    readXlsxFile(file).then((rows) => {
        console.log("cargo ", rows);
        for (let i = 45; i < 54; i++) {
            let row = {
                Seq: rows[i][1],
                Number_of_packages: rows[i][2],
                Kind_of_packages: format(rows[i][3]),
                Transport_unit: rows[i][5],
                Description_of_goods: rows[i][6],
                HS_code: rows[i][8],
                Shipping_marks: rows[i][7],
                Gross_quantity: rows[i][9],
                Gross_Unit: format(rows[i][10]),
                Net_quantity: rows[i][11],
                Net_Unit: format(rows[i][12]),
                Measurement: rows[i][13],
                Measurement_Unit: format(rows[i][18]),
                Seal_number: rows[i][14],
                Custom_status: rows[i][16],
                Size_and_type: rows[i][17],
                BL_number: rows[i][19],
                Port_of_loading: rows[i][20],
                Port_of_discharge: rows[i][21],
            }
            for (let key of Object.keys(row)) {
                if (row[key]) {
                    cargo.rows.push(row)
                    break;
                }
            }

        }
        for (let i = 59; i < 68; i++) {
            let row = {
                Seq: rows[i][1],
                Textual_reference: rows[i][2],
                DG_Classification: rows[i][3],
                IMO_hazard_classes: format(rows[i][4]),
                UN_number: format(rows[i][5]),
                Packing_group: format(rows[i][6]),
                Subsidiary_risk: rows[i][7],
                Flash_point: rows[i][8],
                pollution_code: format(rows[i][9]),
                EmS: rows[i][10],
                Additional_information: rows[i][11],
                Segregation_information: rows[i][12],
                On_board_location: rows[i][13],
            }
            for (let key of Object.keys(row)) {
                if (row[key]) {
                    dpg.rows.push(row)
                    break;
                }
            }

        }


        onSave({cargo});

    })
}

export default readXLSCargo;
