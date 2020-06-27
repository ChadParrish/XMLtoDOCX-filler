<h1 align="center">
  <br>
  <img src="notepad.png" alt="StegCloak" width="100">
  <br>
  <br>
  <span>XML TO DOCX Autofiller</span>
  <br>
<h4 align="center">Autofills data from XML to placeholders to DOCX including images</h4>


<p align="justify">
This tool automatically cleans XML input and replaces it in the placeholders of a input word template. Also converts base64 data to images and embeds them in their corresponding placeholders.
<p>

## Installing

This setup assumes you already have NodeJS installed

```bash
$ git clone https://github.com/mohanpierce99/XMLtoDOCX-filler
```

```bash
$ npm i   #Install dependencies
```
## Executing
```bash
node index.js
```

### Format
**input.docx** contain text placeholders **{Empname}** and image placeholders with a preceeding **%** symbol **{%Insp_sign}** which is important and its how the system could understand and differentiate text and image placeholders

XML **<Empname>** will be filled in {Empname}

XML base64 **<Insp_sign>** will be converted into an image and placed wherever its placeholder {%Insp_sign} is.

Checkout the samples **input.docx** and **appolo.xml** which given to the program generated **output.docx**

Input and output file names can be modified in **index.js**.
