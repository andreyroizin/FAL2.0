import XMLParser from 'react-xml-parser';
import defaultData from '../../config/consts/defaultDataConst'
import readInvoiceXML from "./readInvoiceXML";
import readCmrXML from "./readCmrXML";
import xml from "xml";

function readXML(fileContent, xmlType) {
    let xml = new XMLParser().parseFromString(fileContent);


    switch (xmlType) {
        case 'invoice':
            let invoice = defaultData.invoice;

            readInvoiceXML(invoice, xml);
            return invoice;
        case 'cmr':
            let cmr = defaultData.cmr;
            readCmrXML(cmr, xml);
            return cmr;

    }

}

// A function to assign the references on different elements
// function makeReferences(data) {
//     data.health.illList.map(el => {
//         let {NR, crewPassenger} = el;
//         if (crewPassenger === 'Crew') {
//             let crewItem = data.crew.rows.find(item => item.NR === NR);
//             if (!crewItem) {
//                 return el;
//             }
//             el.firstName = crewItem.Given_name;
//             el.familyName = crewItem.Family_name;
//         } else if (crewPassenger === 'Passenger') {
//             let passengerItem = data.passengers.rows.find(item => item.NR === NR);
//             if (!passengerItem) {
//                 return el;
//             }
//             el.firstName = passengerItem.Given_name;
//             el.familyName = passengerItem.Family_name;
//         }
//
//         return el;
//     })
// }

export default readXML

