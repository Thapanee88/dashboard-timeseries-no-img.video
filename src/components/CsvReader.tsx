import { useState } from 'react';

export default function CsvReader() {
    const [csvFile, setCsvFile] = useState<File | undefined>(undefined);
    const [csvArray, setCsvArray] = useState<{ [key: string]: string }[]>([]);

    const processCSV = (str: string, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {} as { [key: string]: string })
            return eachObject;
        })
        setCsvArray(newArray)
        console.log(csvArray)
    }

    const submit = () => {
        if (csvFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const text = e.target?.result as string;
                console.log(text);
                processCSV(text)
            };

            reader.readAsText(csvFile);
        }
        
    };

    return (
        <form id="csv-form">
            <input
                type="file"
                accept=".csv"
                id="csvFile"
                onChange={(e) => {
                    setCsvFile(e.target.files?.[0]);
                }}
            >
            </input>
            <br />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (csvFile) submit();
                }}>
                Submit
            </button>
        </form>
    );
}