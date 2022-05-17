import countryCodes from "../list_getters/countryCodes";

const readCmrXML = (cmr, xml) => {
   cmr.cmr_id = xml.getElementsByTagName('eCMRID')[0].value;
};

export default readCmrXML;