import listOfCountries from "../../data/countries";

const generateCMR = (cmr) => {
    console.log("generating cmr")

    let eCMRHeaderDetails = [];

    eCMRHeaderDetails.push({eCMRID:cmr.cmr_id});
    eCMRHeaderDetails.push({eCMRIssueDate:cmr.date_of_document});
    eCMRHeaderDetails.push({ContractualRemarks:cmr.remarks});
    eCMRHeaderDetails.push({AdditionalParticularNote:[
            {ContentText:cmr.additional_note_1}
        ]});
    eCMRHeaderDetails.push({AdditionalParticularNote:[
            {ContentText:cmr.additional_note_2}
        ]});
    eCMRHeaderDetails.push({AdditionalParticularNote:[
            {ContentText:cmr.additional_note_3}
        ]});
    eCMRHeaderDetails.push({IssueLocation:[
            {ContryName: listOfCountries[cmr.established_country_code]},
            {CountryCode: cmr.established_country_code},
        ]});


    let RoadConsignment = [];
    RoadConsignment.push({GrossWeight:cmr.gross_weight});
    RoadConsignment.push({GrossVolume:cmr.volume});
    RoadConsignment.push({CODAmount:cmr.cod_amount});

    let Sender = [];

    Sender.push({ID: cmr.sender_id});
    Sender.push({Name: cmr.sender_name});
    Sender.push({LanguageCode: cmr.sender_language_code});

    Sender.push({DefinedContractDetails: [
            {PersonName:cmr.sender_person_name},
            {MobileTelephone:[
                    {CompleteNumber: cmr.sender_complete_number},
                ]},
            {EmailAddress: [
                    {URI: cmr.sender_email}
                ]}
        ]});

    Sender.push({PostalAddress: [
            {Postcode: cmr.sender_postcode},
            {StreetName: cmr.sender_street_name},
            {CityName: cmr.sender_city_name},
            {CountryCode: cmr.sender_country_code},
            {ContryName: listOfCountries[cmr.sender_country_code]},
            {CountrySubDivisionName: cmr.sender_country_subdivision_name},
        ]});

    Sender.push({TaxRegistration:[
            {ID:cmr.sender_tax_id},
            {RegisteredTax:[
                    {TypeCode:cmr.sender_tax_type_code},
                ]}
        ]});

    let Consignee = [];

    Consignee.push({ID: cmr.consignee_id});
    Consignee.push({Name: cmr.consignee_name});
    Consignee.push({LanguageCode: cmr.consignee_language_code});

    Consignee.push({DefinedContractDetails: [
            {PersonName:cmr.consignee_person_name},
            {MobileTelephone:[
                    {CompleteNumber: cmr.consignee_complete_number},
                ]},
            {EmailAddress: [
                    {URI: cmr.consignee_email}
                ]}
        ]});

    Consignee.push({PostalAddress: [
            {Postcode: cmr.consignee_postcode},
            {StreetName: cmr.consignee_street_name},
            {CityName: cmr.consignee_city_name},
            {CountryCode: cmr.consignee_country_code},
            {ContryName: listOfCountries[cmr.consignee_country_code]},
            {CountrySubDivisionName: cmr.consignee_country_subdivision_name},
        ]});
    Consignee.push({TaxRegistration:[
            {ID:cmr.consignee_tax_id},
            {RegisteredTax:[
                    {TypeCode:cmr.consignee_tax_type_code},
                ]}
        ]});

    let Carrier = [];

    Carrier.push({ID: cmr.carrier_id});
    Carrier.push({Name: cmr.carrier_name});
    Carrier.push({LanguageCode: cmr.carrier_language_code});

    Carrier.push({DefinedContractDetails: [
            {PersonName:cmr.carrier_person_name},
            {MobileTelephone:[
                    {CompleteNumber: cmr.carrier_complete_number},
                ]},
            {EmailAddress: [
                    {URI: cmr.carrier_email}
                ]}
        ]});

    Carrier.push({PostalAddress: [
            {Postcode: cmr.carrier_postcode},
            {StreetName: cmr.carrier_street_name},
            {CityName: cmr.carrier_city_name},
            {CountryCode: cmr.carrier_country_code},
            {ContryName: listOfCountries[cmr.carrier_country_code]},
            {CountrySubDivisionName: cmr.carrier_country_subdivision_name},
        ]});

    Carrier.push({TaxRegistration:[
            {ID:cmr.carrier_tax_id},
            {RegisteredTax:[
                    {TypeCode:cmr.carrier_tax_type_code},
                ]}
        ]});

    let SubsequentCarrier = [];

    SubsequentCarrier.push({ID: cmr.sub_carrier_id});
    SubsequentCarrier.push({Name: cmr.sub_carrier_name});
    SubsequentCarrier.push({LanguageCode: cmr.sub_carrier_language_code});

    SubsequentCarrier.push({DefinedContractDetails: [
            {PersonName:cmr.sub_carrier_person_name},
            {MobileTelephone:[
                    {CompleteNumber: cmr.sub_carrier_complete_number},
                ]},
            {EmailAddress: [
                    {URI: cmr.sub_carrier_email}
                ]}
        ]});

    SubsequentCarrier.push({PostalAddress: [
            {Postcode: cmr.sub_carrier_postcode},
            {StreetName: cmr.sub_carrier_street_name},
            {CityName: cmr.sub_carrier_city_name},
            {CountryCode: cmr.sub_carrier_country_code},
            {ContryName: listOfCountries[cmr.sub_carrier_country_code]},
            {CountrySubDivisionName: cmr.sub_carrier_country_subdivision_name},
        ]});
    SubsequentCarrier.push({TaxRegistration:[
            {ID:cmr.sub_carrier_tax_id},
            {RegisteredTax:[
                    {TypeCode:cmr.sub_carrier_tax_type_code},
                ]}
        ]});


    RoadConsignment.push({Sender:Sender});
    RoadConsignment.push({Consignee:Consignee});
    RoadConsignment.push({Carrier:Carrier});
    RoadConsignment.push({SubsequentCarrier:SubsequentCarrier});

    for (let i = 0; i <cmr.documentsAttached.length ; i++) {
        let document = cmr.documentsAttached[i];

        let documentTypeCode = ''
        if (document.TypeCode && document.TypeCode !== '') {
            let typeCode = document.TypeCode.split('- ');
            documentTypeCode = typeCode[1];
        }
        RoadConsignment.push({AssociatedDocument:[
                {TypeCode:documentTypeCode},
                {ID:document.NR},
                {Remarks:document.Remarks},
                {FormattedIssueDateTime:document.Date},
            ]})

    }

    RoadConsignment.push({
        ConsigneeDeliveryEvent:[
            {ActualOccurrenceDateTime:cmr.date_of_delivery},
            {ActualOccurrenceLocation:[
                    {Name:cmr.delivery_place_name},
                    {CountryCode: cmr.delivery_country_code},
                    {CountryName: listOfCountries[cmr.delivery_country_code]},
                ]}
        ]
    });

    RoadConsignment.push({
        CarrierPickUpEvent:[
            {ActualOccurrenceDateTime:cmr.date_of_pickup},
            {ActualOccurrenceLocation:[
                    {Name:cmr.pickup_location_name},
                    {CountryCode: cmr.pickup_country_code},
                    {CountryName: listOfCountries[cmr.pickup_country_code]},
                ]}
        ]
    });

    for (let i = 0; i <cmr.consignment.length ; i++) {
        let consignment_item = cmr.consignment[i];
        RoadConsignment.push({IncludedConsignmentItem: [
                {SequenceNumber:consignment_item.NR},
                {GrossWeight:consignment_item.Gross_weight},
                {GrossVolume:consignment_item.Volume},
                {GoodsDescription:[{IdentificationText:consignment_item.Nature_of_goods}]}
            ]})
    }

    for (let i = 0; i <cmr.consignment.length ; i++) {
        let consignment_item = cmr.consignment[i];
        RoadConsignment.push({TransportPackage: [
                {ItemQuantity:consignment_item.Number_of_packages},
                {TypeCode:consignment_item.Method_of_pa??king},
                {ShippingMarks:[{MarkingText:consignment_item.Marks_and_Nos}]}
            ]})

    }

    RoadConsignment.push({TransportDetails:[
            {StageCode:cmr.truck},
            {ModeCode:cmr.trailer},
        ]});

    RoadConsignment.push({ConsignirProvidedRegulatoryFormalitiesInstructions:[
            {Description:cmr.instruction},
        ]});


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