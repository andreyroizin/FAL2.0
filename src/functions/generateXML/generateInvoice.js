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