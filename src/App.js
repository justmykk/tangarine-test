import React, { useState } from 'react';
import { Upload } from './components/Upload';
import { Table } from './components/Table';
import axios from 'axios';

const _tableHead = [
    'Fullname',
    'Phone Number',
    'Address',
    'State',
    'LGA',
    'Date of Birth',
    'Salary',
    'Gender',
    'Call Allowance',
    'Transport Allowance',
];

const App = () => {
    const [view, setView] = useState('upload');
    const [tableData, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [file, setFile] = useState(null);

    const _uploadDone = (item) => {
        _tableHead.sort();
        const headerList = item.data[0];
        const isSame =
            _tableHead.sort().length === headerList.sort().length &&
            _tableHead.every((item, index) => {
                return item.toLowerCase() === headerList[index].toLowerCase();
            });

        if (isSame) {
            setTableData(item.data);
            setTableHead(item.data.shift());
            setView('table');
            setFile(item.file);
        } else {
            alert('Upload a valid excel file');
            window.location.reload();
        }
    };

    const onSave = async () => {
        let formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('https://httpbin.org/anything', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.status === 200) {
            alert('File saved successfully');
            window.location.reload();
        } else {
            alert(res.statusText);
        }
    };

    return (
        <div className="App">
            <p className="App__title">Upload</p>

            <div className="App__content">
                {view === 'upload' ? (
                    <Upload onUploadDone={(data) => _uploadDone(data)} />
                ) : (
                    <Table
                        onSave={onSave}
                        tableData={tableData}
                        tableHead={tableHead}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
