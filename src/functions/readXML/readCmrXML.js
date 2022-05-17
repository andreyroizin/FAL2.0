import countryCodes from "../list_getters/countryCodes";

const readCmrXML = (cmr, xml) => {
   cmr.cmr_id = xml.getElementsByTagName('eCMRID')[0].value;
   cmr.date_of_document = xml.getElementsByTagName('eCMRIssueDate')[0].value;
   cmr.remarks = xml.getElementsByTagName('ContractualRemarks')[0].value;
};

export default readCmrXML;