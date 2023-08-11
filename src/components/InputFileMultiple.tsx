import { FC, useRef, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';

type AcceptFileType = 'JEPG' | 'PNG' | 'GIF' | 'PDF' | 'CSV';

const acceptFileKeyPair = {
    JEPG: '.jpeg',
    PNG: '.png',
    GIF: '.gif',
    PDF: '.pdf',
    CSV: '.csv',
};

interface IInputFileProps {
    acceptFile: AcceptFileType[];
    onChange: (value: File[]) => void;
}

const InputFileMultiple: FC<IInputFileProps> = (props) => {
    const [fileNames, setFileNames] = useState<string[]>([]);

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const names = selectedFiles.map((file) => file.name);
            setFileNames(names);
            props.onChange(selectedFiles);
        }
    };

    return (
        <div>
            <div
                className={['flex items-center p-3 cursor-pointer border-[2px] rounded', fileNames.length > 0 ? 'border-green' : 'border-gray'].join(' ')}
                onClick={handleClick}
            >
                <div>
                    <FaFileCsv className={['text-2xl', fileNames.length > 0 ? 'text-green' : 'text-gray_text'].join(' ')} />
                </div>
                <div className='ml-3'>{fileNames.length > 0 ? fileNames.join(', ') : 'Please Select File'}</div>
            </div>
            <input
                type='file'
                multiple
                accept={props.acceptFile.map((item) => acceptFileKeyPair[item]).join(',')}
                ref={hiddenFileInput}
                onChange={handlerFile}
                className='hidden'
            />
        </div>
    );
};

export default InputFileMultiple;
