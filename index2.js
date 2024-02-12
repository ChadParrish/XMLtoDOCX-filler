const PizZip = require('pizzip');
const { DOMParser } = require("@xmldom/xmldom");
const Docxtemplater = require('docxtemplater');
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');

const { clean, base64DataURLToArrayBuffer } = require('./util');
const { Console } = require('console');


let parsedObject = JSON.parse(convert.xml2json(fs.readFileSync("apollo.xml", "utf-8"), { compact: true, spaces: 4 })).root.row;

let result = clean(parsedObject);
let content = fs.readFileSync(path.resolve(__dirname, 'cc30192.docx'), 'binary');

let zip = new PizZip(content);

//Load the template docx file as a binary

let doc;
try {
    doc = new Docxtemplater().loadZip(zip)
    
} catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    console.log(error);
}
var nowDate = new Date;
var myDate = nowDate.toLocaleDateString();

console.log(myDate);
const myObject = {
    UserFullName: "John Doe",
    JobTitle: "Head Honcho",
    PhoneNumber: "0652455478",
    UserEmail: "test@cshlaw.com",
    FirstName: "John",
    LastName: "Doe",
    Address: "73893 Blvd Plaza, Cary, NC 27511",
    Salutation: "Mr. Doe",
    MatterNumber: "09999.1000000",
    CheckAmount: "500",
    CheckNumber: "10344",
    UserFullNameSig: "Signature Here",
    PrincipalFeeEarner: "Tojo Muhodats",
    Date: myDate,
    Description: "Relegation to D League"

};
doc.render(myObject);

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, "output2.docx"), buf);