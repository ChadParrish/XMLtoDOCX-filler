const PizZip = require('pizzip');
const { DOMParser } = require("@xmldom/xmldom");
const fs = require('fs');
const path = require('path');
function str2xml(str) {
    if (str.charCodeAt(0) === 65279) {
        // BOM sequence
        str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
}

function getParagraphs(content) {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());
    const paragraphsXml = xml.getElementsByTagName("w:p");
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
        let fullText = "";
        const textsXml =
            paragraphsXml[i].getElementsByTagName("w:t");
        for (let j = 0, len2 = textsXml.length; j < len2; j++) {
            const textXml = textsXml[j];
            if (textXml.childNodes) {
                fullText += textXml.childNodes[0].nodeValue;
            }
        }

        paragraphs.push(fullText);
    }
    return paragraphs;
}

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "cc30192.docx"),
    "binary"
);

// Will print ['Hello John', 'how are you ?'] if the document has two paragraphs.
console.log(getParagraphs(content));