const readCargoXML = (cargo, dpg, xml) => {
    let CargoConsignmentData = xml.getElementsByTagName('CargoConsignmentsData')[0];
    cargo.rows = [];
    dpg.rows = [];
    console.log("CargoConsignmentData ", CargoConsignmentData)
    if (CargoConsignmentData) {

        for (let i = 0; i < CargoConsignmentData.children.length; i++) {
            let Consignment = CargoConsignmentData.children[i];
            let portOfLoadingFormatted = '';
            let portOfDischargeFormatted = '';
            let ConsignmentNumber = '';
            try {
                ConsignmentNumber = Consignment.children.find(el => el.name === "ConsignmentNumber").value
            } catch (e) {
                ConsignmentNumber = '';
            }

            try {
                let portOfLoading = Consignment.children.find(el => el.name === "PortOfLoading")
                    .children.find(el => el.name === 'Port')
                portOfLoadingFormatted = portOfLoading.children.find(el => el.name === 'UNLoCode').value + ' - ' + portOfLoading.children.find(el => el.name === 'CountryCode').value + ' - ' + portOfLoading.children.find(el => el.name === 'Name').value;
            } catch (e) {
                portOfLoadingFormatted = '';
            }
            try {
                let portOfDischarge = Consignment.children.find(el => el.name === "PortOfDischarge")
                    .children.find(el => el.name === 'Port')
                portOfDischargeFormatted = portOfDischarge.children.find(el => el.name === 'UNLoCode').value + ' - ' + portOfDischarge.children.find(el => el.name === 'CountryCode').value + ' - ' + portOfDischarge.children.find(el => el.name === 'Name').value;
            } catch (e) {
                portOfDischargeFormatted = '';
            }

            let CargoItemFirst = Consignment.children.find(el => el.name === "CargoItem");
            for (let j = Consignment.children.indexOf(CargoItemFirst); j < Consignment.children.length; j++) {
                let CargoItem = Consignment.children[j];
                if (CargoItem) {
                    try {
                        let Seq = CargoItem.children.find(el => el.name === "ItemNumber").value;
                        let Number_of_packages = CargoItem.children.find(el => el.name === "NoOfPackages").value;
                        let Kind_of_packages = CargoItem.children.find(el => el.name === "PackageType").value;
                        let Container = CargoItem.children.find(el => el.name === "Container");
                        let Transport_unit = Container.children.find(el => el.name === "MarksAndNumber").value;
                        let GoodsType = CargoItem.children.find(el => el.name === "GoodsType");
                        let Description = GoodsType.children.find(el => el.name === "Description").value;
                        let HSCode = GoodsType.children.find(el => el.name === "HSCode").value;
                        let Shipping_marks = CargoItem.children.find(el => el.name === "ShippingMarks").value;
                        let Gross_quantity = CargoItem.children.find(el => el.name === "GrossQuantity");
                        let Gross_quantity_content = Gross_quantity.children.find(el => el.name === "Content").value;
                        let Gross_Unit = Gross_quantity.children.find(el => el.name === "UnitCode").value;
                        let Net_quantity = CargoItem.children.find(el => el.name === "NetQuantity");
                        let Net_quantity_content = Net_quantity.children.find(el => el.name === "Content").value;
                        let Net_Unit = Net_quantity.children.find(el => el.name === "UnitCode").value;
                        let Measurement = CargoItem.children.find(el => el.name === "NetQuantity");
                        let Measurement_content = Measurement.children.find(el => el.name === "Content").value;
                        let Measurement_Unit = Measurement.children.find(el => el.name === "UnitCode").value;
                        let Seal_number = Container.children.find(el => el.name === "SealNumber").value;
                        let Size_and_type = Container.children.find(el => el.name === "SizeAndType").value;
                        let Custom_status = CargoItem.children.find(el => el.name === "CustomStatus").value;
                        let row = {
                            Seq: Seq,
                            BL_number: ConsignmentNumber,
                            Port_of_loading: portOfLoadingFormatted,
                            Port_of_discharge: portOfDischargeFormatted,
                            Number_of_packages: Number_of_packages,
                            Kind_of_packages: Kind_of_packages,
                            Transport_unit: Transport_unit,
                            Description_of_goods: Description,
                            HS_code: HSCode,
                            Shipping_marks: Shipping_marks,
                            Gross_quantity: Gross_quantity_content,
                            Gross_Unit: Gross_Unit,
                            Net_quantity: Net_quantity_content,
                            Net_Unit: Net_Unit,
                            Measurement: Measurement_content,
                            Measurement_Unit: Measurement_Unit,
                            Seal_number: Seal_number,
                            Custom_status: Custom_status,
                            Size_and_type: Size_and_type,
                        }

                        cargo.rows.push(row)
                        let DGSafetyDataSheet = CargoItem.children.find(el => el.name === "DGSafetyDataSheet");
                        console.log("DGSafetyDataSheet ", DGSafetyDataSheet)
                        if (DGSafetyDataSheet) {
                            let Textual_reference = DGSafetyDataSheet.children.find(el => el.name === "ProperShippingName").value;
                            let DG_Classification = DGSafetyDataSheet.children.find(el => el.name === "DGClassification").value;
                            let IMO_hazard_classes = DGSafetyDataSheet.children.find(el => el.name === "UNClass").value;
                            let UN_number = DGSafetyDataSheet.children.find(el => el.name === "UNNumber").value;
                            let Packing_group = DGSafetyDataSheet.children.find(el => el.name === "PackingGroup").value;
                            let Subsidiary_risk = DGSafetyDataSheet.children.find(el => el.name === "SubsidiaryRisks").value;
                            let Flash_point = DGSafetyDataSheet.children.find(el => el.name === "FlashPoint").value;
                            let pollution_code = DGSafetyDataSheet.children.find(el => el.name === "MARPOLPollutionCode").value;
                            let EmS = DGSafetyDataSheet.children.find(el => el.name === "EmergencyInstruction").value;
                            let Additional_information = DGSafetyDataSheet.children.find(el => el.name === "Comment").value;
                            let Segregation_information = DGSafetyDataSheet.children.find(el => el.name === "SegregationInformation").value;
                            let On_board_location = DGSafetyDataSheet.children.find(el => el.name === "OnBoardLocation").value;
                            let dgdRow = {
                                Seq: Seq,
                                Container_number: Transport_unit,
                                Textual_reference: Textual_reference,
                                DG_Classification: DG_Classification,
                                IMO_hazard_classes: IMO_hazard_classes,
                                UN_number: UN_number,
                                Packing_group: Packing_group,
                                Subsidiary_risk: Subsidiary_risk,
                                Flash_point: Flash_point,
                                pollution_code: pollution_code,
                                EmS: EmS,
                                Additional_information: Additional_information,
                                Segregation_information: Segregation_information,
                                On_board_location: On_board_location,
                            }
                            console.log("dgdRow ", dgdRow)
                            dpg.rows.push(dgdRow);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }


};

export default readCargoXML;