import { FC, useRef, useState } from 'react';
import { FaFileCsv } from 'react-icons/fa';

type AcceptFileType = 'JEPG' | 'PNG' | 'GIF' | 'PDF' | 'CSV';

const acceptFileKeyPair = {
    JEPG: '.jpeg',
    PNG: '.png',
    GIF: '.gif',
    PDF: '.pdf',
    CSV: '.csv'
};

interface IInputFileProps {
    acceptFile: AcceptFileType[];
    onChange: (value: File) => void;
}

const InputFile: FC<IInputFileProps> = (props) => {
    const [fileName, setFileName] = useState('');

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFileName(file.name);
            props.onChange(file);
        }
    };

    return (
        <div>
            <div
                className={['flex items-center p-3 cursor-pointer border-[2px] rounded', fileName ? 'border-green' : 'border-gray'].join(' ')}
                onClick={handleClick}
            >
                <div>
                    <FaFileCsv className={['text-2xl', fileName ? 'text-green' : 'text-gray_text'].join(' ')} />
                </div>
                <div className='ml-3'>{fileName ? fileName : 'Please Select File'}</div>
            </div>
            <input
                type='file'
                accept={props.acceptFile.map((item) => acceptFileKeyPair[item]).join(',')}
                ref={hiddenFileInput}
                onChange={handlerFile}
                className='hidden'
            />
        </div>
    );
};

export default InputFile;