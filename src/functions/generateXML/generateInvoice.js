import listOfPortsConst from "../../config/JSON/listOfPorts";
import listOfPurposesOfCallsConst from "../../config/consts/listOfPurposesOfCallsConst";

const generateInvoice = (invoice) => {

    let invoiceXML = {
        CIIMessage:[{
            ExchangedDocument: [
                {ID: invoice.id},
                {IssueDateTime: invoice.occurrence}
                ]
        }]
    }

    return invoiceXML;
};

export const checkRequiredInvoice = (errors, data) => {
    errors.Invoice = {};

}

export default generateInvoice;