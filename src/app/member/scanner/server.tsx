'use server';

import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
});


export interface OpenAPIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Choice[]
  usage: Usage
  system_fingerprint: string
}

export interface Choice {
  index: number
  message: Message
  logprobs: any
  finish_reason: string
}

export interface Message {
  role: string
  content: string
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface OcrReceipt {
    name: string;
    address: string;
    total: {
        net: string;
        tax: string;
        gross: string;
    };
    datetime: string;
    receiptNumber: string;
};

export interface OcrReceiptError {
  error: string;
}


export async function createInvoice(formData: FormData): Promise<OcrReceipt | OcrReceiptError> {
  'use server'

  const file = formData.get("file") as File;
  console.log(file.size);
  // parseReceipt(file).then(x => console.log(JSON.stringify(x))).catch(err => console.error('error:', err));
  const buffer = await file.arrayBuffer();
  const b64 = btoa(
  new Uint8Array(buffer)
    .reduce((data, byte) => data + String.fromCharCode(byte), '')
);
console.log(file.size)
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: [
        {"type": "text", "text": `You get an image input of a receipt. I want to extract the following information as JSON:
- name of the store with the key "name"
- Address as one single string value with the key "address" as a german address format with street name, house number, zip code and city
- costs split in net, tax and gross as a subobject for "total" key
- date and time together as a datetime string with key "datetime" as iso datetime
- receipt number with they key "receiptNumber"
If you cannot extract any of these information, leave the values empty.
If you think the input is no receipt, return an object with one key 'error' and the error message as string.`},
        {
          "type": "image_url",
          "image_url": {
            "url": `data:image/jpeg;base64,${b64}`,
          },
        },
      ],
    }],
    "response_format": {type: 'json_object'},
    "max_tokens": 300,
  });
  if (!chatCompletion?.choices || chatCompletion.choices.length === 0) {
    return {
      error: "no choices present",
    }
  }
  const unparsedJSONResult = chatCompletion.choices[0]?.message?.content;
  if (!unparsedJSONResult) {
    return {
      error: "no content present"
    }
  }
  try {
    const result = JSON.parse(unparsedJSONResult) as OcrReceipt | OcrReceiptError;
    if (isError(result)) {
      return {
        error: "cannot detect content"
      }
    }
    return result;
  } catch(err: any) {
    console.error(err);
    return {
      error: "cannot parse result"
    }
  }
}

function isError(response: OcrReceipt | OcrReceiptError): response is OcrReceiptError {
  return (response as OcrReceiptError).error !== undefined;
}

async function parseReceipt(file: File): Promise<any> {
  const apiKey = '';
  const url = 'https://api.ocr.space/parse/image';

  // Create form data
  const form = new FormData();
  form.append('file', file);

  try {
    const response = await axios.post(url, form, {
      headers: {
        'apikey': apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error processing the OCR request:', error);
    return { error: 'Error processing the OCR request' };
  }
}
