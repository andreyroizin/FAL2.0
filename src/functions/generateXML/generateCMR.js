import listOfCountries from "../../data/countries";

const generateCMR = (cmr) => {
    console.log("generating cmr")

    let eCMRHeaderDetails = [];

    eCMRHeaderDetails.push({eCMRID:cmr.cmr_id});
    eCMRHeaderDetails.push({eCMRIssueDate:cmr.date_of_document});
    eCMRHeaderDetails.push({ContractualRemarks:cmr.remarks});

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

    RoadConsignment.push({Sender:Sender});


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