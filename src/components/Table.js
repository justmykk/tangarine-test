import React from 'react';

export const Table = ({ tableData, tableHead, onSave }) => {
    return (
        <>
            <div style={{ padding: 20, width: '100%' }}>
                <div className="table-action">
                    <p style={{ color: '#9A9AA2' }}>Column Mapping</p>
                    <button onClick={onSave} className="App__button">Save</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            {tableHead.map((item, index) => (
                                <td key={index}>{item.toUpperCase()}</td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={'tr' + index}>
                                {item.map((val, i) => (
                                    <td key={'td' + i}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
