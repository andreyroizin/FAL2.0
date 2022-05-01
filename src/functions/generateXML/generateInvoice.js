import listOfPortsConst from "../../config/JSON/listOfPorts";
import listOfPurposesOfCallsConst from "../../config/consts/listOfPurposesOfCallsConst";

const generateInvoice = (invoice) => {

    let invoiceXML = {
        CIIMessage:[{
            EPCMessageHeader: [
                {ID: invoice.id,}

                ]
        }]
    }

    return invoiceXML;
};

export const checkRequiredInvoice = (errors, data) => {
    errors.Invoice = {};

}

export default generateInvoice;