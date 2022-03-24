import React from 'react';
import { connect } from 'react-redux';


const EditHabit = (props) => {
    if (!props.show) {
        return null;
    }

    const closeModal = () => {
        props.show();
    }
    return (
        <div className='modal-bg'>  
            <div className='modal'>
                    <div className='modal-close' onClick={closeModal}>X</div>
                <div className='modal-content'></div>
                    <h3 className='modal-title'>Drink water</h3>
                </div>
                <div className='modal-body'>
                    <div className='wrapper-editHabit'>
                        <div className='edit-decrement'>-</div>
                        <input type='text' className='edit-field'></input>
                        <div className='edit-increment'>+</div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <div className="btn-save">
                        Update
                    </div>
                    <div className="link-delete">
                        Delete habit
                    </div>
                </div>
        </div>
    )
};

export default EditHabit;