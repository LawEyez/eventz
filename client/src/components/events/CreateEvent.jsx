import React from 'react'

const CreateEvent = props => {
    return (
        <form>
            <div className="form-inline">
                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-pencil"></i>
                    </div>
                    
                    <input type="text" name="title" placeholder="Event Title" ref={props.titleField} />
                </div>

                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-popup"></i>
                    </div>
                    <input type="text" name="desc" placeholder="Event Description" ref={props.descField} />
                </div>
            </div>

            <div className="form-inline">
                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-coin"></i>
                    </div>
                    <input type="number" name="price" placeholder="Ticket Price" ref={props.priceField} />
                </div>

                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-calendar"></i>
                    </div>
                    <input type="date" name="date" placeholder="Date" ref={props.dateField} />
                </div>
            </div>
            
            <div className="form-inline">
                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-timer"></i>
                    </div>
                    <input type="time" name="time" placeholder="Time" ref={props.timeField} />
                </div>

                <div className="form-group">
                    <div className="icon-wrapper">
                        <i className="lni lni-map-marker"></i>
                    </div>
                    <input type="text" name="location" placeholder="Location" ref={props.locationField} />
                </div>
            </div>

            <div className="form-group">
                <div className="icon-wrapper">
                    <i className="lni lni-upload"></i>
                </div>
                <input type="file" name="poster" onChange={props.uploadHandler} />
            </div>
        </form>
    )
}

export default CreateEvent