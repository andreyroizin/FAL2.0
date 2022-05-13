import listOfCountries from "../../data/countries";

const generateCMR = (cmr) => {
    console.log("generating cmr")

    let eCMRHeaderDetails = [];

    eCMRHeaderDetails.push({eCMRID:cmr.cmr_id});
    eCMRHeaderDetails.push({eCMRIssueDate:cmr.date_of_document});
    eCMRHeaderDetails.push({ContractualRemarks:cmr.remarks});

    let RoadConsignment = [];

    let cmrXML = {
        MMTCCBDAeCMRMessage:[
            {eCMRHeaderDetails:eCMRHeaderDetails},
            {RoadConsignment:RoadConsignment},

        ]
    }

    return cmrXML;

};

export const checkRequiredCMR = (errors, cmr) => {
    errors.CMR = {};
    // if (!cmr.invoice_id) errors.Invoice["ID"] = true;
    // if (!cmr.date_of_document) errors.Invoice["Date of document"] = true;
}

export default generateCMR;