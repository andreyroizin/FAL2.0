const documentTypes = require("../../data/document_types")

export function getDocumentTypes() {
    return Object.keys(documentTypes);
}

export function getDocumentsWithTypes() {
    let documentsWithTypes = [];
    for (let i = 0; i < Object.keys(documentTypes).length; i++) {
        let documentWithType = Object.values(documentTypes)[i] + ' - ' + Object.keys(documentTypes)[i];
        documentsWithTypes.push(documentWithType);
    }
    return documentsWithTypes;
}

export function getDocumentWithCodeByCode(documentType) {
    if (documentType !== '' && documentType != null) {
        return documentTypes[documentType] + ' - ' + documentType;
    }
    return '';

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getDocumentTypes, getDocumentsWithTypes, getDocumentWithCodeByCode};