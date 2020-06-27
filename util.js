

const _isBase64 = (str) => {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(str);
}

const clean = result => {
    result = Object.assign({}, result);

    Object.keys(result).forEach((x) => {
        result[x] = result[x]["_text"]
        if (result[x] == undefined)
            result[x] = ""
    });

    return result;
}



const base64DataURLToArrayBuffer = dataURL => {
    const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;

    if (!base64Regex.test(dataURL)) {
        if (_isBase64(dataURL)) {
            dataURL = "data:image/png;base64," + dataURL;
        } else {
            return false;
        }
    }
    const stringBase64 = dataURL.replace(base64Regex, "");
    let binaryString = Buffer.from(stringBase64, "base64").toString("binary");
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}

// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
const _replaceErrors = (key, value) => {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function (error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

const errorHandler = error => {
    console.log(JSON.stringify({ error: error }, _replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
    }
    throw error;
}


module.exports = { base64DataURLToArrayBuffer, clean, errorHandler }