const readInvoiceXML = (invoice, xml) => {

   invoice.invoice_id = xml.getElementsByTagName('ExchangedDocument')[0].children[0].value;
   invoice.date_of_document = xml.getElementsByTagName('IssueDateTime')[0].value;

   invoice.tradeLineItems = [];

   let tradeLineItems = xml.getElementsByTagName('IncludedTradeLineItem');
   for (let i = 0; i <tradeLineItems.length; i++) {

      let tradeLineItem = tradeLineItems[i];

      let tradeLineItemToSave = {
         NR: i + 1,
         Name: tradeLineItem.children[2].children[0].value
      }

      invoice.tradeLineItems.push(tradeLineItemToSave)
      console.log("tradeLineItem ",tradeLineItem)

   }
   console.log("tradeLineItems ",tradeLineItems)
};

export default readInvoiceXML;