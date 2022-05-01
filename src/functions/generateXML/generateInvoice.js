import listOfPortsConst from "../../config/JSON/listOfPorts";
import listOfPurposesOfCallsConst from "../../config/consts/listOfPurposesOfCallsConst";

const generateInvoice = (invoice) => {

    let SupplyChainTradeTransaction = [];
    for (let i = 0; i < invoice.tradeLineItems.length; i++) {
        let tradeLineItem = invoice.tradeLineItems[i];
        console.log("tradeLineItem",tradeLineItem);
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

        console.log("TradeProduct",TradeProduct)

        IncludedTradeLineItem.push({TradeProduct: TradeProduct})
        console.log("IncludedTradeLineItem",IncludedTradeLineItem)
        SupplyChainTradeTransaction.push({IncludedTradeLineItem: IncludedTradeLineItem})
        console.log("SupplyChainTradeTransaction",SupplyChainTradeTransaction)
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