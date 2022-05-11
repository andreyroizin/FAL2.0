import countryCodes from "../list_getters/countryCodes";

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
         Charge_amount: tradeLineItem.children[0].children[0].children[0].value,
         Basis_quantity: tradeLineItem.children[0].children[0].children[1].value,
         Billed_quantity: tradeLineItem.children[1].children[0].value,
         Total_amount: tradeLineItem.children[3].children[0].children[0].value,
         Tax_total_amount: tradeLineItem.children[3].children[0].children[1].value,
         Net_total_amount: tradeLineItem.children[3].children[0].children[2].value,
      }

      invoice.tradeLineItems.push(tradeLineItemToSave)

   }
   let seller = xml.getElementsByTagName('Seller')[0];


   invoice.seller_id = seller.children[0].value;
   invoice.seller_name = seller.children[1].value;
   invoice.seller_language_code = seller.children[2].value;
   invoice.seller_tax_id = seller.children[5].children[0].value;
   invoice.seller_tax_type_code = seller.children[5].children[1].children[0].value;
   invoice.seller_person_name = seller.children[3].children[0].value;
   invoice.seller_complete_number = seller.children[3].children[1].children[0].value;
   invoice.seller_email = seller.children[3].children[2].children[0].value;
   invoice.seller_postcode = seller.children[4].children[0].value;
   invoice.seller_street_name = seller.children[4].children[1].value;
   invoice.seller_city_name = seller.children[4].children[2].value;
   invoice.seller_country_code = seller.children[4].children[3].value;
   invoice.seller_country_subdivision_name = seller.children[4].children[5].value;

   let buyer = xml.getElementsByTagName('Buyer')[0];

   invoice.buyer_id = buyer.children[0].value;
   invoice.buyer_name = buyer.children[1].value;
   invoice.buyer_language_code = buyer.children[2].value;
   invoice.buyer_tax_id = buyer.children[5].children[0].value;
   invoice.buyer_tax_type_code = buyer.children[5].children[1].children[0].value;
   invoice.buyer_person_name = buyer.children[3].children[0].value;
   invoice.buyer_complete_number = buyer.children[3].children[1].children[0].value;
   invoice.buyer_email = buyer.children[3].children[2].children[0].value;
   invoice.buyer_postcode = buyer.children[4].children[0].value;
   invoice.buyer_street_name = buyer.children[4].children[1].value;
   invoice.buyer_city_name = buyer.children[4].children[2].value;
   invoice.buyer_country_code = buyer.children[4].children[3].value;
   invoice.buyer_country_subdivision_name = buyer.children[4].children[5].value;

   let relatedConsignment = xml.getElementsByTagName('RelatedConsignment')[0];
   invoice.gross_weight = relatedConsignment.children[0].value;
   invoice.net_weight = relatedConsignment.children[1].value
   invoice.package_quantity = relatedConsignment.children[2].value
   invoice.transport_means_id = relatedConsignment.children[3].children[0].children[0].value

   invoice.occurrence_date_time = xml.getElementsByTagName('OccurenceDateTime')[0].value;
   invoice.due_payable_amount = xml.getElementsByTagName('DuePayableAmount')[0].value;
   invoice.invoice_currency_code = xml.getElementsByTagName('InvoiceCurrencyCode')[0].value;
   invoice.ibanID = xml.getElementsByTagName('IBANID')[0].value;
   invoice.exemption_reason_code = xml.getElementsByTagName('ExemptionReasonCode')[0].value;
   invoice.account_name = xml.getElementsByTagName('PayeeCreditorFinancialAccount')[0].children[1].value;
   invoice.payment_term_description = xml.getElementsByTagName('PaymentTerms')[0].children[0].value;




   // console.log("tradeLineItems ",tradeLineItems)
};

export default readInvoiceXML;