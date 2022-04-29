import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredDangerous = (errors, data) => {
    errors.Dangerous_goods = {};

    if (JSON.stringify(data.rows) !== JSON.stringify([
        {}
    ])) {
        data.rows.forEach(el => {
            if (!el.Textual_reference) errors.Dangerous_goods['Textual reference'] = [];
            if (!el.DG_Classification) errors.Dangerous_goods['DG Classification'] = [];
        })
    }
}

const generateCargo = (cargo, dpg, EPCRequestBody) => {
    let CargoConsignmentsData = [];
    let checkedBLNumbers = [];
    let rows = cargo.rows;
    let dpgRows = dpg.rows;

    for (let i = 0; i < rows.length; i++) {
        console.log("generate cargo")
        if (rows[i].BL_number) {
            if (!checkedBLNumbers.includes(rows[i].BL_number)) {
                console.log("checking ", rows[i].BL_number)
                let Consignment = [];

                Consignment.push({ConsignmentNumber: rows[i].BL_number})

                let portOfLoading = {};
                if (rows[i].Port_of_loading && rows[i].Port_of_loading !== '') {
                    let PortCode = rows[i].Port_of_loading.split(' -')[0]
                    portOfLoading = listOfPortsConst.find(function (element) {
                        return element.code === PortCode;
                    });
                }
                let portOfDischarge = {};
                if (rows[i].Port_of_discharge && rows[i].Port_of_discharge !== '') {
                    let PortCode = rows[i].Port_of_discharge.split(' -')[0]
                    portOfDischarge = listOfPortsConst.find(function (element) {
                        return element.code === PortCode;
                    });
                }

                if (portOfLoading) {
                    Consignment.push({
                        PortOfLoading: [
                            {
                                Port: [
                                    {Name: portOfLoading.name},
                                    {CountryCode: portOfLoading.countryCode},
                                    {UNLoCode: portOfLoading.code}
                                ]
                            }]
                    });
                }

                if (portOfDischarge) {
                    Consignment.push({
                        PortOfDischarge: [
                            {
                                Port: [
                                    {Name: portOfDischarge.name},
                                    {CountryCode: portOfDischarge.countryCode},
                                    {UNLoCode: portOfDischarge.code}
                                ]
                            }]
                    });
                }
                let CargoItem = [];
                CargoItem.push({ItemNumber: rows[i].Seq});
                CargoItem.push({ShippingMarks: rows[i].Shipping_marks});
                CargoItem.push({NoOfPackages: rows[i].Number_of_packages});
                CargoItem.push({PackageType: rows[i].Kind_of_packages});
                CargoItem.push({
                    GrossQuantity: [
                        {Content: rows[i].Gross_quantity},
                        {UnitCode: rows[i].Gross_Unit}
                    ]
                });
                CargoItem.push({
                    NetQuantity: [
                        {Content: rows[i].Net_quantity},
                        {UnitCode: rows[i].Net_Unit}
                    ]
                });
                CargoItem.push({
                    GoodsType: [
                        {HSCode: rows[i].HS_code},
                        {Description: rows[i].Description_of_goods}
                    ]
                });
                CargoItem.push({
                    Measurement: [
                        {Content: rows[i].Measurement},
                        {UnitCode: rows[i].Measurement_Unit}
                    ]
                });
                CargoItem.push({CustomStatus: rows[i].Custom_status});
                let dpgTable = dpgRows.find(function (element) {
                    return parseInt(element.Seq) === parseInt(rows[i].Seq);
                });

                if (dpgTable) {
                    CargoItem.push({
                        DGSafetyDataSheet: [
                            {ProperShippingName: dpgTable.Textual_reference},
                            {DGClassification: dpgTable.DG_Classification},
                            {UNNumber: dpgTable.UN_number},
                            {UNClass: dpgTable.IMO_hazard_classes},
                            {PackingGroup: dpgTable.Packing_group},
                            {SubsidiaryRisks: dpgTable.Subsidiary_risk},
                            {FlashPoint: dpgTable.Flash_point},
                            {MARPOLPollutionCode: dpgTable.pollution_code},
                            {EmergencyInstruction: dpgTable.EmS},
                            {SegregationInformation: dpgTable.Segregation_information},
                            {OnBoardLocation: dpgTable.On_board_location},
                            {Comment: dpgTable.Additional_information},
                        ]
                    })
                }

                CargoItem.push({
                    Container: [
                        {MarksAndNumber: rows[i].Transport_unit},
                        {SizeAndType: rows[i].Size_and_type},
                        {SealNumber: rows[i].Seal_number},
                    ]
                });
                Consignment.push({CargoItem: CargoItem});
                for (let j = i+1; j < rows.length; j++) {
                    if (rows[j].BL_number === rows[i].BL_number) {
                        let CargoItem = [];
                        CargoItem.push({ItemNumber: rows[j].Seq});
                        CargoItem.push({ShippingMarks: rows[j].Shipping_marks});
                        CargoItem.push({NoOfPackages: rows[j].Number_of_packages});
                        CargoItem.push({PackageType: rows[j].Kind_of_packages});
                        CargoItem.push({
                            GrossQuantity: [
                                {Content: rows[j].Gross_quantity},
                                {UnitCode: rows[j].Gross_Unit}
                            ]
                        });
                        CargoItem.push({
                            NetQuantity: [
                                {Content: rows[j].Net_quantity},
                                {UnitCode: rows[j].Net_Unit}
                            ]
                        });
                        CargoItem.push({
                            GoodsType: [
                                {HSCode: rows[j].HS_code},
                                {Description: rows[j].Description_of_goods}
                            ]
                        });
                        CargoItem.push({
                            Measurement: [
                                {Content: rows[j].Measurement},
                                {UnitCode: rows[j].Measurement_Unit}
                            ]
                        });
                        CargoItem.push({CustomStatus: rows[j].Custom_status});
                        let dpgTable = dpgRows.find(function (element) {
                            return parseInt(element.Seq) === parseInt(rows[j].Seq);
                        });

                        if (dpgTable) {
                            CargoItem.push({
                                DGSafetyDataSheet: [
                                    {ProperShippingName: dpgTable.Textual_reference},
                                    {DGClassification: dpgTable.DG_Classification},
                                    {UNNumber: dpgTable.UN_number},
                                    {UNClass: dpgTable.IMO_hazard_classes},
                                    {PackingGroup: dpgTable.Packing_group},
                                    {SubsidiaryRisks: dpgTable.Subsidiary_risk},
                                    {FlashPoint: dpgTable.Flash_point},
                                    {MARPOLPollutionCode: dpgTable.pollution_code},
                                    {EmergencyInstruction: dpgTable.EmS},
                                    {SegregationInformation: dpgTable.Segregation_information},
                                    {OnBoardLocation: dpgTable.On_board_location},
                                    {Comment: dpgTable.Additional_information},
                                ]
                            })
                        }

                        CargoItem.push({
                            Container: [
                                {MarksAndNumber: rows[j].Transport_unit},
                                {SizeAndType: rows[j].Size_and_type},
                                {SealNumber: rows[j].Seal_number},
                            ]
                        });
                        Consignment.push({CargoItem: CargoItem});
                    }
                }
                CargoConsignmentsData.push({Consignment: Consignment})
                checkedBLNumbers.push(rows[i].BL_number)
                console.log("checkedBLNumbers ",checkedBLNumbers)
            }


        }
    }


    EPCRequestBody.push({CargoConsignmentsData: CargoConsignmentsData})
};

export default generateCargo;

// Consignment.push({CargoItemListSize: rows.length});
// for (let i = 0; i < rows.length; i++) {
//     let CargoItem = [];
//
//     CargoItem.push({ItemNumber: rows[i].Seq});
//     CargoItem.push({ShippingMarks: rows[i].Shipping_marks});
//     CargoItem.push({NoOfPackages: rows[i].Number_of_packages});
//     CargoItem.push({PackageType: rows[i].Kind_of_packages});
//     CargoItem.push({
//         GrossQuantity: [
//             {Content: rows[i].Gross_quantity},
//             {UnitCode: rows[i].Gross_Unit}
//         ]
//     });
//     CargoItem.push({
//         NetQuantity: [
//             {Content: rows[i].Net_quantity},
//             {UnitCode: rows[i].Net_Unit}
//         ]
//     });
//     CargoItem.push({
//         GoodsType: [
//             {HSCode: rows[i].HS_code},
//             {Description: rows[i].Description_of_goods}
//         ]
//     });
//     CargoItem.push({
//         Measurement: [
//             {Content: rows[i].Measurement},
//             {UnitCode: rows[i].Measurement_Unit}
//         ]
//     });
//     CargoItem.push({CustomStatus: rows[i].Custom_status});
//     let dpgTable = dpgRows.find(function (element) {
//         return parseInt(element.Seq) === parseInt(rows[i].Seq);
//     });
//
//
//     if (dpgTable) {
//         CargoItem.push({
//             DGSafetyDataSheet: [
//                 {ProperShippingName: dpgTable.Textual_reference},
//                 {DGClassification: dpgTable.DG_Classification},
//                 {UNNumber: dpgTable.UN_number},
//                 {UNClass: dpgTable.IMO_hazard_classes},
//                 {PackingGroup: dpgTable.Packing_group},
//                 {SubsidiaryRisks: dpgTable.Subsidiary_risk},
//                 {FlashPoint: dpgTable.Flash_point},
//                 {MARPOLPollutionCode: dpgTable.pollution_code},
//                 {EmergencyInstruction: dpgTable.EmS},
//                 {SegregationInformation: dpgTable.Segregation_information},
//                 {OnBoardLocation: dpgTable.On_board_location},
//                 {Comment: dpgTable.Additional_information},
//             ]
//         })
//     }
//
//     CargoItem.push({
//         Container: [
//             {MarksAndNumber: rows[i].Transport_unit},
//             {SizeAndType: rows[i].Size_and_type},
//             {SealNumber: rows[i].Seal_number},
//         ]
//     });
//     Consignment.push({CargoItem: CargoItem});
// }
// Consignment.push({CargoItemListSize: rows.length});