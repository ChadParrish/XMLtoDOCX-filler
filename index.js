const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');
const { clean, base64DataURLToArrayBuffer } = require('./util');


let parsedObject = JSON.parse(convert.xml2json(fs.readFileSync("apollo.xml", "utf-8"), { compact: true, spaces: 4 })).root.row;

let result = clean(parsedObject);


//Load the template docx file as a binary
let content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

let zip = new PizZip(content);
let doc;
try {
    doc = new Docxtemplater().loadZip(zip)

} catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
}

//set the templateVariables
doc.setData(result);

try {
    doc.render()
}
catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
}

const buf = doc.getZip()
    .generate({ type: 'nodebuffer' });

console.log("DOCX written")

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
