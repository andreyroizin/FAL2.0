import listOfCountries from "../../data/countries";

const generateCMR = (cmr) => {
    console.log("generating cmr")

};

export const checkRequiredCMR = (errors, cmr) => {
    errors.CMR = {};
    // if (!cmr.invoice_id) errors.Invoice["ID"] = true;
    // if (!cmr.date_of_document) errors.Invoice["Date of document"] = true;
}

export default generateCMR;