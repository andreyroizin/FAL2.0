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
        ]});

    Seller.push({TaxRegistration:[
            {ID:invoice.seller_tax_id},
            {RegisteredTax:[
                    {TypeCode:invoice.seller_tax_type_code},
                ]}
        ]});

    let Buyer = [];

    Buyer.push({ID: invoice.buyer_id});
    Buyer.push({Name: invoice.buyer_name});
    Buyer.push({LanguageCode: invoice.buyer_language_code});

    Buyer.push({DefinedContractDetails: [
            {PersonName:invoice.buyer_person_name},
            {MobileTelephone:[
                    {CompleteNumber: invoice.buyer_complete_number},
                ]},
            {EmailAddress: [
                    {URI: invoice.buyer_email}
                ]}
        ]});

    Buyer.push({PostalAddress: [
            {Postcode: invoice.buyer_postcode},
            {StreetName: invoice.buyer_street_name},
            {CityName: invoice.buyer_city_name},
            {CountryCode: invoice.buyer_country_code},
            {ContryName: listOfCountries[invoice.buyer_country_code]},
            {CountrySubDivisionName: invoice.buyer_country_subdivision_name},
        ]});
    Buyer.push({TaxRegistration:[
            {ID:invoice.buyer_tax_id},
            {RegisteredTax:[
                    {TypeCode:invoice.buyer_tax_type_code},
                ]}
        ]});

    HeaderTradeAgreement.push({Seller:Seller});
    HeaderTradeAgreement.push({Buyer:Buyer});
    SupplyChainTradeTransaction.push({HeaderTradeAgreement:HeaderTradeAgreement})

    let HeaderTradeDelivery = [];
    HeaderTradeDelivery.push({RelatedConsignment:[
            {GrossWeight:invoice.gross_weight},
            {NetWeight:invoice.net_weight},
            {PackageQuantity:invoice.package_quantity},
            {SpecifiedTransportMovement:[
                    {UsedTransportMeans:[{ID:invoice.transport_means_id}]}]}
        ]});
    HeaderTradeDelivery.push({ActualDespatchEvent:[{
            OccurenceDateTime:invoice.occurrence_date_time
        }]});


    SupplyChainTradeTransaction.push({HeaderTradeDelivery:HeaderTradeDelivery});

    let HeaderTradeSettlement = [];

    HeaderTradeSettlement.push({DuePayableAmount:invoice.due_payable_amount})
    HeaderTradeSettlement.push({InvoiceCurrencyCode:invoice.invoice_currency_code})
    HeaderTradeSettlement.push({PaymentMeans:[
            {PayeeCreditorFinancialAccount:[
                    {IBANID: invoice.ibanID},
                    {Name: invoice.account_name}
                ]}
            ]});
    HeaderTradeSettlement.push({TradeTax:[
            {ExemptionReasonCode:invoice.exemption_reason_code}
        ]});
    HeaderTradeSettlement.push({PaymentTerms:[
            {Description:invoice.payment_term_description}
        ]});

    SupplyChainTradeTransaction.push({HeaderTradeSettlement:HeaderTradeSettlement});


    let invoiceXML = {
        CIIMessage:[{
            ExchangedDocument: [
                {ID: invoice.invoice_id},
                {IssueDateTime: invoice.date_of_document},
                ],

        },
            {SupplyChainTradeTransaction:SupplyChainTradeTransaction},

        ]
    }

    return invoiceXML;
};

export const checkRequiredInvoice = (errors, invoice) => {
    errors.Invoice = {};
    if (!invoice.id) errors.id["ID"] = true;
}

export default generateInvoice;