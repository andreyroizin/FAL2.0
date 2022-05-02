import listOfCountries from "../../data/countries";

const generateInvoice = (invoice) => {

    let SupplyChainTradeTransaction = [];
    for (let i = 0; i < invoice.tradeLineItems.length; i++) {
        let tradeLineItem = invoice.tradeLineItems[i];
        let IncludedTradeLineItem = [];

        let TradeProduct = [];
        TradeProduct.push({Name: tradeLineItem.Name});
        TradeProduct.push({Description: tradeLineItem.Description});
        TradeProduct.push({NetWeight: tradeLineItem.Net_weight});
        TradeProduct.push({GrossWeight: tradeLineItem.Gross_weight});
        TradeProduct.push({Classification: [{ClassCode:tradeLineItem.Class_code}]});

        let originCountryCode = '';
        if (tradeLineItem.Origin_country && tradeLineItem.Origin_country !== '') {
            let originCountry = tradeLineItem.Origin_country.split('- ');
            originCountryCode = originCountry[1];
        }

        TradeProduct.push({OriginCountry: [{Code:originCountryCode}]});

        IncludedTradeLineItem.push({LineTradeAgreement: [
                {ProductGrossPrice:[
                    {ChargeAmount:tradeLineItem.Charge_amount},
                    {BasisQuantity:tradeLineItem.Basis_quantity}
                    ]}

            ]});

        IncludedTradeLineItem.push({LineTradeDelivery: [{BilledQuantity:tradeLineItem.Billed_quantity}]})
        IncludedTradeLineItem.push({TradeProduct: TradeProduct})
        IncludedTradeLineItem.push({LineTradeSettlement: [
                {MonetarySummation:[
                        {LineTotalAmount:tradeLineItem.Total_amount},
                        {TaxTotalAmount:tradeLineItem.Tax_total_amount},
                        {NetLineTotalAmount:tradeLineItem.Net_total_amount}
                    ]}

            ]});
        SupplyChainTradeTransaction.push({IncludedTradeLineItem: IncludedTradeLineItem})

    }

    let HeaderTradeAgreement = [];

    let Seller = [];

    Seller.push({ID: invoice.seller_id});
    Seller.push({Name: invoice.seller_name});
    Seller.push({LanguageCode: invoice.seller_language_code});

    Seller.push({DefinedContractDetails: [
            {PersonName:invoice.seller_person_name},
            {MobileTelephone:[
                    {CompleteNumber: invoice.seller_complete_number},
                ]},
            {EmailAddress: [
                    {URI: invoice.seller_email}
                ]}
        ]});

    Seller.push({PostalAddress: [
            {Postcode: invoice.seller_postcode},
            {StreetName: invoice.seller_street_name},
            {CityName: invoice.seller_city_name},
            {CountryCode: invoice.seller_country_code},
            {ContryName: listOfCountries[invoice.seller_country_code]},
            {CountrySubDivisionName: invoice.seller_country_subdivision_name},
        ]})

    HeaderTradeAgreement.push({Seller:Seller});
    SupplyChainTradeTransaction.push({HeaderTradeAgreement:HeaderTradeAgreement})


    let invoiceXML = {
        CIIMessage:[{
            ExchangedDocument: [
                {ID: invoice.id},
                ],

        },{SupplyChainTradeTransaction:SupplyChainTradeTransaction}]
    }

    return invoiceXML;
};

export const checkRequiredInvoice = (errors, data) => {
    errors.Invoice = {};

}

export default generateInvoice;