import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, request } from 'http';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const boundary = req.headers['content-type']?.split('; ')[1]?.split('=')[1];
    if (!boundary) {
        return res.status(400).json({ message: 'Invalid boundary' });
    }

    const fileParts: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
        fileParts.push(chunk);
    });

    req.on('end', async () => {
        const fileData = Buffer.concat(fileParts);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/octet-stream',
            },
        };

        // Modify this URL to your API endpoint
        const apiEndpoint = 'http://43.239.223.188:3004/api/work247/tool/addLinkJdUpFbHistory';

        const apiRequest = request(apiEndpoint, options, (apiResponse) => {
            if (apiResponse.statusCode && apiResponse.statusCode >= 200 && apiResponse.statusCode < 300) {
                res.status(200).json({ message: 'Tải file thành công' });
            } else {
                res.status(apiResponse.statusCode || 500).json({ message: 'Lỗi tải file' });
            }
        });

        apiRequest.on('error', (error) => {
            res.status(500).json({ message: 'An error occurred while uploading the file' });
        });

        apiRequest.write(fileData);
        apiRequest.end();
    });
};

export default uploadHandler;
