"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = createInvoice;
exports.isError = isError;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
;
async function createInvoice(file) {
    // parseReceipt(file).then(x => console.log(JSON.stringify(x))).catch(err => console.error('error:', err));
    // const b64 = btoa(
    //     new Uint8Array(buffer)
    //         .reduce((data, byte) => data + String.fromCharCode(byte), '')
    // );
    const b64 = file.toString('base64');
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{
                role: 'user', content: [
                    {
                        "type": "text", "text": `You get an image input of a receipt. I want to extract the following information as JSON:
- name of the store with the key "name"
- Address as one single string value with the key "address" as a german address format with street name, house number, zip code and city
- costs split in net, tax and gross as a subobject for "total" key
- date and time together as a datetime string with key "datetime" as iso datetime
- receipt number with they key "receiptNumber"
If you cannot extract any of these information, leave the values empty.
If you think the input is no receipt, return an object with one key 'error' and the error message as string.`
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${b64}`,
                        },
                    },
                ],
            }],
        "response_format": { type: 'json_object' },
        "max_tokens": 300,
    });
    if (!chatCompletion?.choices || chatCompletion.choices.length === 0) {
        return {
            error: "no choices present",
        };
    }
    const unparsedJSONResult = chatCompletion.choices[0]?.message?.content;
    if (!unparsedJSONResult) {
        return {
            error: "no content present"
        };
    }
    try {
        const result = JSON.parse(unparsedJSONResult);
        if (isError(result)) {
            return {
                error: "cannot detect content"
            };
        }
        return result;
    }
    catch (err) {
        console.error(err);
        return {
            error: "cannot parse result"
        };
    }
}
function isError(response) {
    return response.error !== undefined;
}
// async function parseReceipt(file: File): Promise<any> {
//     const apiKey = '';
//     const url = 'https://api.ocr.space/parse/image';
//     // Create form data
//     const form = new FormData();
//     form.append('file', file);
//     try {
//         const response = await axios.post(url, form, {
//             headers: {
//                 'apikey': apiKey,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error processing the OCR request:', error);
//         return { error: 'Error processing the OCR request' };
//     }
// }
