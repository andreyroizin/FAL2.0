import listOfPortsConst from "../../config/JSON/listOfPorts";
import listOfPurposesOfCallsConst from "../../config/consts/listOfPurposesOfCallsConst";

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


    let invoiceXML = {
        CIIMessage:[{
            ExchangedDocument: [
                {ID: invoice.id},
                {IssueDateTime: invoice.occurrence}
                ],

        },{SupplyChainTradeTransaction:SupplyChainTradeTransaction}]
    }

    return invoiceXML;
};

export const checkRequiredInvoice = (errors, data) => {
    errors.Invoice = {};

}

export default generateInvoice;