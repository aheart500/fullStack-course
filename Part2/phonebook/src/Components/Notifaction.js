import React from 'react'

const Notifaction = ({message}) => {
    if (message === null){
        return null
    }
    return (
        <div className={message.status === 'success' ? 'error-box' : 'error-box failure'}>
            {message.message}
        </div>
    )
}

export default Notifaction
