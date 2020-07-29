import React, { useEffect } from 'react';
import cloud from '../cloud.svg';
import readXlsxFile from 'read-excel-file';

export const Upload = ({ onUploadDone }) => {
    useEffect(() => {
        let el = document.getElementById('file');

        const handleFileInput = () => {readFile(el.files[0])};

        el.addEventListener('change', handleFileInput);

        return () => el.removeEventListener('change', handleFileInput);
    }, []);

    const uploadFile = () => {
        let el = document.getElementById('file');
        el.click();
    };

    const onDrop = (ev) => {
        ev.preventDefault();
        readFile(ev.dataTransfer.files[0]);
    };

    const readFile = (file) => {
        readXlsxFile(file)
            .then((ev) => {
                onUploadDone({ data: ev, file });
            })
            .catch((error) => console.log('xls error', error));
    };

    return (
        <>
            <div
                className="upload"
                onDragEnter={(ev) => ev.preventDefault()}
                onDragLeave={(ev) => ev.preventDefault()}
                onDragOver={(ev) => ev.preventDefault()}
                onDrop={onDrop}
            >
                <img src={cloud} alt="upload" style={{ height: 120 }} />
                <p>Drag and drop a file here</p>
                <p>or</p>
                <button onClick={uploadFile} className="App__button">
                    Upload
                </button>
            </div>

            <input type="file" style={{ display: 'none' }} id="file" />
        </>
    );
};
