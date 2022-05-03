const readInvoiceXML = (invoice, xml) => {

   invoice.invoice_id = xml.getElementsByTagName('ExchangedDocument')[0].children[0].value;
};

export default readInvoiceXML;