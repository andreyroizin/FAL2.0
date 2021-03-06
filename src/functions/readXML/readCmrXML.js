import documentTypes from "../list_getters/documentTypesGetter";

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

   let consignee = xml.getElementsByTagName('Consignee')[0];
   cmr.consignee_id = consignee.children[0].value;
   cmr.consignee_name = consignee.children[1].value;
   cmr.consignee_language_code = consignee.children[2].value;
   cmr.consignee_tax_id = consignee.children[5].children[0].value;
   cmr.consignee_tax_type_code = consignee.children[5].children[1].children[0].value;
   cmr.consignee_person_name = consignee.children[3].children[0].value;
   cmr.consignee_complete_number = consignee.children[3].children[1].children[0].value;
   cmr.consignee_email = consignee.children[3].children[2].children[0].value;
   cmr.consignee_postcode = consignee.children[4].children[0].value;
   cmr.consignee_street_name = consignee.children[4].children[1].value;
   cmr.consignee_city_name = consignee.children[4].children[2].value;
   cmr.consignee_country_code = consignee.children[4].children[3].value;
   cmr.consignee_country_subdivision_name = consignee.children[4].children[5].value;

   let carrier = xml.getElementsByTagName('Carrier')[0];
   cmr.carrier_id = carrier.children[0].value;
   cmr.carrier_name = carrier.children[1].value;
   cmr.carrier_language_code = carrier.children[2].value;
   cmr.carrier_tax_id = carrier.children[5].children[0].value;
   cmr.carrier_tax_type_code = carrier.children[5].children[1].children[0].value;
   cmr.carrier_person_name = carrier.children[3].children[0].value;
   cmr.carrier_complete_number = carrier.children[3].children[1].children[0].value;
   cmr.carrier_email = carrier.children[3].children[2].children[0].value;
   cmr.carrier_postcode = carrier.children[4].children[0].value;
   cmr.carrier_street_name = carrier.children[4].children[1].value;
   cmr.carrier_city_name = carrier.children[4].children[2].value;
   cmr.carrier_country_code = carrier.children[4].children[3].value;
   cmr.carrier_country_subdivision_name = carrier.children[4].children[5].value;

   let sub_carrier = xml.getElementsByTagName('SubsequentCarrier')[0];
   cmr.sub_carrier_id = sub_carrier.children[0].value;
   cmr.sub_carrier_name = sub_carrier.children[1].value;
   cmr.sub_carrier_language_code = sub_carrier.children[2].value;
   cmr.sub_carrier_tax_id = sub_carrier.children[5].children[0].value;
   cmr.sub_carrier_tax_type_code = sub_carrier.children[5].children[1].children[0].value;
   cmr.sub_carrier_person_name = sub_carrier.children[3].children[0].value;
   cmr.sub_carrier_complete_number = sub_carrier.children[3].children[1].children[0].value;
   cmr.sub_carrier_email = sub_carrier.children[3].children[2].children[0].value;
   cmr.sub_carrier_postcode = sub_carrier.children[4].children[0].value;
   cmr.sub_carrier_street_name = sub_carrier.children[4].children[1].value;
   cmr.sub_carrier_city_name = sub_carrier.children[4].children[2].value;
   cmr.sub_carrier_country_code = sub_carrier.children[4].children[3].value;
   cmr.sub_carrier_country_subdivision_name = sub_carrier.children[4].children[5].value;

   cmr.date_of_pickup = xml.getElementsByTagName('CarrierPickUpEvent')[0].children[0].value;
   cmr.pickup_location_name = xml.getElementsByTagName('CarrierPickUpEvent')[0].children[1].children[0].value;
   cmr.pickup_country_code = xml.getElementsByTagName('CarrierPickUpEvent')[0].children[1].children[1].value;

   cmr.date_of_delivery = xml.getElementsByTagName('ConsigneeDeliveryEvent')[0].children[0].value;
   cmr.delivery_place_name = xml.getElementsByTagName('ConsigneeDeliveryEvent')[0].children[1].children[0].value;
   cmr.delivery_country_code = xml.getElementsByTagName('ConsigneeDeliveryEvent')[0].children[1].children[1].value;

   cmr.additional_note_1 = xml.getElementsByTagName('AdditionalParticularNote')[0].children[0].value;
   cmr.additional_note_2 = xml.getElementsByTagName('AdditionalParticularNote')[1].children[0].value;
   cmr.additional_note_3 = xml.getElementsByTagName('AdditionalParticularNote')[2].children[0].value;

   cmr.gross_weight = xml.getElementsByTagName('GrossWeight')[0].value;
   cmr.volume = xml.getElementsByTagName('GrossVolume')[0].value;
   cmr.cod_amount = xml.getElementsByTagName('CODAmount')[0].value;

   cmr.established_country_code = xml.getElementsByTagName('IssueLocation')[0].children[1].value;
   cmr.truck = xml.getElementsByTagName('StageCode')[0].value;
   cmr.trailer = xml.getElementsByTagName('ModeCode')[0].value;
   cmr.instruction = xml.getElementsByTagName('Description')[0].value;

   let documentsAttached = xml.getElementsByTagName('AssociatedDocument');
   cmr.documentsAttached = []
   for (let i = 0; i <documentsAttached.length; i++) {

      let document = documentsAttached[i];
      let documentToSave = {
         NR: document.children[1].value,
         TypeCode: documentTypes.getDocumentWithCodeByCode(document.children[0].value),
         Remarks: document.children[2].value,
         Date: document.children[3].value,
      }

      cmr.documentsAttached.push(documentToSave)

   }

   let includedConsignmentItems = xml.getElementsByTagName('IncludedConsignmentItem');
   let transportPackages = xml.getElementsByTagName('TransportPackage');
   cmr.consignment = []
   for (let i = 0; i <includedConsignmentItems.length; i++) {

      let item = includedConsignmentItems[i];

      let transportPackage = transportPackages[i];

      let consignmentToSave = {
         NR: item.children[0].value,
         Gross_weight: item.children[1].value,
         Volume: item.children[2].value,
         Nature_of_goods: item.children[3].children[0].value,
         Number_of_packages: transportPackage.children[0].value,
         Method_of_pa??king: transportPackage.children[1].value,
         Marks_and_Nos: transportPackage.children[2].children[0].value,
      };


      cmr.consignment.push(consignmentToSave)

   }

};

export default readCmrXML;