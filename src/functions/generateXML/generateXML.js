import xml from 'xml'
import generateInvoice, {checkRequiredInvoice} from "./generateInvoice";
import _ from 'underscore'
import generateCMR from "./generateCMR";

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
            let invoiceXML = generateInvoice(data.invoice)
            let xmlValueInvoice = xml([invoiceXML], {declaration: true});
            downloadXMLfile(xmlValueInvoice);
        case 'cmr':
            let cmrXML = generateCMR(data.cmr)
            let xmlValueCMR = xml([cmrXML], {declaration: true});
            downloadXMLfile(xmlValueCMR);

    }
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