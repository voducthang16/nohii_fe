import notification from "antd/es/notification";
import { TYPE_ACTION } from "../../constants/type-action";

const width = 400;
const getNotificationStyle = type => ({
    success: {
        zIndex: 9999999,
        width: width,
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #b7eb8f',
        backgroundColor: '#f6ffed',
        boxShadow: '0 8px 8px #0a10143d, 0 0 8px #0a10141f',
        borderRadius: '5px'
    },
    warning: {
        zIndex: 9999999,
        width: width,
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #ffe58f',
        backgroundColor: '#fffbe6',
        boxShadow: '0 8px 8px #0a10143d, 0 0 8px #0a10141f',
        borderRadius: '5px'
    },
    error: {
        zIndex: 9999999,
        width: width,
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #ffa39e',
        backgroundColor: '#fff1f0',
        boxShadow: '0 8px 8px #0a10143d, 0 0 8px #0a10141f',
        borderRadius: '5px'
    },
    info: {
        zIndex: 9999999,
        width: width,
        color: 'rgba(0, 0, 0, 0.65)',
        border: '1px solid #91d5ff',
        backgroundColor: '#e6f7ff',
        boxShadow: '0 8px 8px #0a10143d, 0 0 8px #0a10141f',
        borderRadius: '5px'
    }
}[type])

const setSuccess = (title, message) => notification[TYPE_ACTION.SUCCESS]({
    key: title,
    message: <div style={{whiteSpace:"pre-wrap"}}>{title}</div>,
    description: <div style={{whiteSpace:"pre-wrap"}}>{message}</div>,
    duration: 5,
    style: getNotificationStyle(TYPE_ACTION.SUCCESS)
})

const setWarning = (title, message) => notification[TYPE_ACTION.WARNING]({
    key: title,
    message: title,
    description: message,
    duration: 5,
    style: getNotificationStyle(TYPE_ACTION.WARNING)
})

const setInfo = (title, message) => notification[TYPE_ACTION.INFO]({
    key: title,
    message: title,
    description: message,
    duration: 5,
    style: getNotificationStyle(TYPE_ACTION.INFO)
})

const setError = (title, message) => notification[TYPE_ACTION.ERROR]({
    key: title,
    message: title,
    description: message,
    duration: 5,
    style: getNotificationStyle(TYPE_ACTION.ERROR)
})

const NotificationHelper = {
    setSuccess,
    setError,
    setInfo,
    setWarning
};

export default NotificationHelper;
