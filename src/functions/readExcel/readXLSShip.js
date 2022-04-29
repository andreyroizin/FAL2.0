import data from '../../config/consts/defaultDataConst'
import readXlsxFile from 'read-excel-file'

const readXLSShip = (file, onSave) => {
    let ship = data.ship;
    readXlsxFile(file).then((rows) => {
        ship.name = rows[3][2];
        ship.iMOnumber = rows[3][4];
        ship.otherInfo = rows[4][4];
        ship.callSign = rows[4][2];
        ship.mmsiNumner = rows[4][4];
        ship.flagState = rows[7][2];
        ship.grossTonnage = rows[8][2];
        ship.netTonnage = rows[8][4];
        ship.port = rows[13][2];
        // let issueDate =
        // let issueDate = new Date();
        ship.issueDate = getUIDate(rows[13][4]);
        // ship.issueDate = `${issueDate.getFullYear()}-${(issueDate.getMonth() + 1)}-${(issueDate.getDate() + 1)}`
        ship.certificateNumber = rows[13][6];
        ship.companyName = rows[16][2];
        ship.iMOCompany = rows[16][4];
        ship.phone = rows[17][2];
        ship.fax = rows[17][2];
        ship.email = rows[17][6];
        ship.builtYear = rows[19][2];
        ship.deadWeight = rows[19][4];
        ship.length = rows[20][2];
        ship.beam = rows[20][4];
        ship.summerDraught = rows[20][6];
        let shipType = rows[7][4];
        if (shipType) ship.shipType = shipType.split('(')[1].split(')')[0];

        console.log("Port read from Excel: ", ship);
        onSave({ship});
    });
};

export function getUIDate(issueDate, isDateTime) {
    if (!issueDate) return undefined;
    let year = issueDate.getFullYear();
    let month = issueDate.getMonth();
    let date = issueDate.getDate();
    let hours = issueDate.getHours();
    let minutes = issueDate.getMinutes();
    month ++;
    if (month < 10) month = `0${month}`;
    if (date < 10) date = `0${date}`;
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    if (!isDateTime){
        return `${year}-${month}-${date}`;
    }
    if (issueDate.getUTCHours() === 0) hours = '00';

    return `${year}-${month}-${date}T${hours}:${minutes}`
}

export default readXLSShip;