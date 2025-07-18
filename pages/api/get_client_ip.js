// pages/api/get_client_ip.js
import requestIp from 'request-ip';
const os = require('os');
export default function handler(req, res) {
    let clientIp

    const networkInterfaces = os.networkInterfaces()
    Object.keys(networkInterfaces).forEach(interfaceName => {
        networkInterfaces[interfaceName].forEach(interface1 => {
            // Kiểm tra nếu đây là địa chỉ IPv4 và không phải là loopback address
            if (interface1.family === 'IPv4' && !interface1.internal) {
                clientIp = interface1.address
            }
        });
    });

    res.status(200).json({
        message: "Địa chỉ IP",
        clientIp: clientIp
    });
};
