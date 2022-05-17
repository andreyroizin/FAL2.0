import countryCodes from "../list_getters/countryCodes";

const readCmrXML = (cmr, xml) => {
   cmr.cmr_id = xml.getElementsByTagName('eCMRID')[0].value;
   cmr.date_of_document = xml.getElementsByTagName('eCMRIssueDate')[0].value;
   cmr.remarks = xml.getElementsByTagName('ContractualRemarks')[0].value;

   let sender = xml.getElementsByTagName('Sender')[0];
   cmr.sender_id = sender.children[0].value;
   cmr.sender_name = sender.children[1].value;
   cmr.sender_language_code = sender.children[2].value;
   cmr.sender_tax_id = sender.children[5].children[0].value;
   cmr.sender_tax_type_code = sender.children[5].children[1].children[0].value;
   cmr.sender_person_name = sender.children[3].children[0].value;
   cmr.sender_complete_number = sender.children[3].children[1].children[0].value;
   cmr.sender_email = sender.children[3].children[2].children[0].value;
   cmr.sender_postcode = sender.children[4].children[0].value;
   cmr.sender_street_name = sender.children[4].children[1].value;
   cmr.sender_city_name = sender.children[4].children[2].value;
   cmr.sender_country_code = sender.children[4].children[3].value;
   cmr.sender_country_subdivision_name = sender.children[4].children[5].value;
};

export default readCmrXML;