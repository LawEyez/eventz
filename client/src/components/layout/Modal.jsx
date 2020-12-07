import React from 'react'

const Modal = props => {
    return (
        <div className="modal" id={props.id}>
            <button className='btn modal-close' onClick={props.closeModal}>
                <i className="lni lni-close"></i>
            </button>
            <div className="modal-header">
                <h1 className='title-2'>{props.title}</h1>
                <p className="">{props.desc}</p>
            </div>
            <div className="modal-body">
                {props.children}

                <div className="btn-inline mt-3">
                    {!props.creator && props.canConfirm && <button type='submit' className="btn btn-sky mr-1" onClick={props.onConfirm}>{props.confirmText}</button>}
                    {props.canCancel && <button className="btn btn-dk-otl" onClick={props.closeModal}>cancel</button>}
                </div>
                
            </div>
            
        </div>
    )
}

export default Modal