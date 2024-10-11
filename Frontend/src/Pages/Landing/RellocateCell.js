import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css'

function ReallocateCell({ onClose }) {
    const [prisonerId, setPrisonerId] = useState('');
    const [newCellNo, setNewCellNo] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.put('/reallocate_prisoner', {
                prisoner_id: prisonerId,
                new_cell_no: newCellNo
            });
            
            if (response.data.success) {
                setSuccessMessage('Prisoner reallocated successfully!');
            } else {
                setError('Failed to reallocate prisoner. Please try again.');
            }
        } catch (error) {
            console.error("Error reallocating prisoner:", error);
            setError('Error reallocating prisoner. Please check the inputs or try again later.');
        }
    };

    return (
        <div className="reallocate-cell-form">
            <h2>Reallocate Prisoner</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="prisonerId">Prisoner ID:</label>
                    <input
                        type="text"
                        id="prisonerId"
                        value={prisonerId}
                        onChange={(e) => setPrisonerId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newCellNo">New Cell Number:</label>
                    <input
                        type="text"
                        id="newCellNo"
                        value={newCellNo}
                        onChange={(e) => setNewCellNo(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Reallocate</button>
            </form>
        </div>
    );
}

export default ReallocateCell;
