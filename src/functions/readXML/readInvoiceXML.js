import countryCodes from "../countryCodes";

const readInvoiceXML = (invoice, xml) => {

   invoice.invoice_id = xml.getElementsByTagName('ExchangedDocument')[0].children[0].value;
   invoice.date_of_document = xml.getElementsByTagName('IssueDateTime')[0].value;

   invoice.tradeLineItems = [];

   let tradeLineItems = xml.getElementsByTagName('IncludedTradeLineItem');
   for (let i = 0; i <tradeLineItems.length; i++) {

      let tradeLineItem = tradeLineItems[i];

      let tradeLineItemToSave = {
         NR: i + 1,
         Name: tradeLineItem.children[2].children[0].value,
         Description: tradeLineItem.children[2].children[1].value,
         Net_weight: tradeLineItem.children[2].children[2].value,
         Gross_weight: tradeLineItem.children[2].children[3].value,
         Class_code: tradeLineItem.children[2].children[4].children[0].value,
         Origin_country: countryCodes.getCountryWithCodeByCode(tradeLineItem.children[2].children[5].children[0].value),
      }

      invoice.tradeLineItems.push(tradeLineItemToSave)
      console.log("tradeLineItem ",tradeLineItem)

   }
   console.log("tradeLineItems ",tradeLineItems)
};

export default readInvoiceXML;