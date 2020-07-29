import React, { useEffect } from 'react';
import cloud from '../cloud.svg';
import readXlsxFile from 'read-excel-file';

export const Upload = ({onUploadDone}) => {
    useEffect(() => {
        let el = document.getElementById('file');

        const handleFileInput = () => {
            readXlsxFile(el.files[0])
                .then((ev) => {
                    onUploadDone({data: ev, file: el.files[0]});
                })
                .catch((error) => console.log('xls error', error));
        };

        el.addEventListener('change', handleFileInput);

        return () => el.removeEventListener('change', handleFileInput);
    }, []);

    const uploadFile = () => {
        let el = document.getElementById('file');
        el.click();
    };

    return (
        <>
            <div className="upload">
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
