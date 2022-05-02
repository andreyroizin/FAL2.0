import xml from 'xml'
import generatePort, {checkRequiredPort} from "./generatePort";
import generateCrew, {checkRequiredCrew} from "./generateCrew";
import generateShip, {checkRequiredShip} from "./generateShip";
import generatePassengers, {checkRequiredPassengers} from "./generatePasssengers";
import generateVoyage, {checkRequiredVoyage} from "./generateVoyage";
import generateShipStores from "./generateShipStores";
import generateHealth, {checkRequiredHealth} from "./generateHealth";
import generateCrewEffects, {checkRequiredCrewEffects} from "./generateCrewEffects";
import generateCargo, {checkRequiredDangerous} from "./generateCargo";
import generateSecurity, {checkRequiredSecurity} from "./generateSecurity";
import generateWaste, {checkRequiredWaste} from "./generateWaste";
import generateInvoice, {checkRequiredInvoice} from "./generateInvoice";
import _ from 'underscore'

function createXML(data, onError, checkForErrors,xmlType) {
    if(checkForErrors){
        const errors = checkRequiredFields(data);
        if (!_.isEmpty(errors)) {
            onError(errors);
            return;
        }
    }



    switch (xmlType) {
        case 'invoice':
            let SupplyChainTradeTransaction = [];
            let invoiceXML = generateInvoice(data.invoice)
            let xmlValue = xml([invoiceXML], {declaration: true});
            downloadXMLfile(xmlValue);

    }

    // let EPCRequestBody = [];
    // generatePort(data.port, EPCRequestBody);
    // generateCrew(data.crew, EPCRequestBody);
    // generateShip(data.ship, EPCRequestBody);
    // generatePassengers(data.passengers, EPCRequestBody);
    // generateVoyage(data.voyage, EPCRequestBody);
    // generateShipStores(data.shipStores, EPCRequestBody);
    // generateHealth(data.health, EPCRequestBody);
    // generateCrewEffects(data.crewEffects, EPCRequestBody);
    // generateCargo(data.cargo, data.dpg, EPCRequestBody)
    // generateSecurity(data.security, EPCRequestBody);
    // generateWaste(data.waste, EPCRequestBody);

    // let xmlValue = xml([{
    //     EPCMessage: [{
    //         EPCMessageHeader: [
    //             {ArrivalDeparture: data.port.arrivalDeparture}
    //         ]
    //     },
    //         {
    //             EPCRequestBody: EPCRequestBody
    //         }
    //     ]
    // }], {declaration: true});
    // downloadXMLfile(xmlValue);
}

function checkRequiredFields(data) {
    console.log("checking for errors")
    const errors = {};
    checkRequiredInvoice(errors, data.invoice);


    //deleting empty objects
    Object.keys(errors).forEach(el => {
        if (_.isEmpty(errors[el])) delete errors[el];
    })

    return errors;
}

let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    let file = new Blob([data], /*{type: type}*/);

    let a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

export default createXML;