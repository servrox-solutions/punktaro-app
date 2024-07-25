export interface UploadReceiptResponse {
    result: Result
    data: Data
    error?: string;
}

export interface Result {
    digest: string
    confirmedLocalExecution: boolean
}

export interface Data {
    name: string
    address: string
    total: Total
    datetime: string
    receiptNumber: string
}

export interface Total {
    net: number
    tax: number
    gross: number
}


export function uploadReceipt(file: File, account: string): Promise<UploadReceiptResponse> {
    const formData = new FormData();
    formData.set('receipt', file, 'receipt.jpg');
    formData.set('account', account);

    return fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/addreceipt`, {
        method: "POST",
        body: formData
    }).then(response => response.json() as Promise<UploadReceiptResponse>);
}