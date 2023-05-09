const path = require('path');
const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');

// Middleware for handling multipart/form-data. Primarily used for uploading files.
const multer = require('multer');

// HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) 
//other than its own from which a browser should permit loading resources
const cors = require('cors');

// For POST, PATCH, or PUT HTTP request wherein the info needed is within the body.
//Using body - parser allows you to access req.
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());;
app.use(express.json());

const upload = multer();
const port = process.env.PORT || 5000;

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=evidencemanagementstore;AccountKey=Ix6eB40v67pInDdazd7u8kC/OfGAdyIlJ9OXag1x3Cg3RmArJ2UFKy/PDJRAjaKlfG4ovOjZZ56++AStjNFfig==;EndpointSuffix=core.windows.net';
const containerName = 'courtcasedocs';
const accountKey = 'Ix6eB40v67pInDdazd7u8kC/OfGAdyIlJ9OXag1x3Cg3RmArJ2UFKy/PDJRAjaKlfG4ovOjZZ56++AStjNFfig==';
const accountName = 'evidencemanagementstore';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadFile = async (file, caseNum, station, FIR, act, section, caseType, petitioner, respondent, advocate, court, state, dateFiled, dateListed, status) => {
    console.log(file.name);
    const fileExt = path.extname(file.originalname);;
    const blobName = `Court_Document_${petitioner}_vs_${respondent}_${court}_${state}_${dateListed}_${status}${fileExt}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const metadata = {
        caseNum,
        station,
        FIR,
        act,
        section,
        caseType,
        petitioner,
        respondent,
        advocate,
        court,
        state,
        dateFiled,
        dateListed,
        status
    };
    await blockBlobClient.upload(file.buffer, file.size, {
        metadata
    });
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    return url;
};

app.get('/', (req, res) => {
    console.log("Connected to Server");
    res.end('Hello World!');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { caseNum, station, FIR, act, section, caseType, petitioner, respondent, advocate, court, state, dateFiled, dateListed, selectedValue } = req.body;
        const file = req.file;
        console.log("File name", file.name);
        const url = await uploadFile(file, caseNum, station, FIR, act, section, caseType, petitioner, respondent, advocate, court, state, dateFiled, dateListed, selectedValue);
        res.json({ url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/search", async (req, res) => {
    const searchText = req.body.searchText;
    console.log("Search Text", searchText);

    try {
        const blobs = [];
        for await (const blob of containerClient.listBlobsFlat()) {            
            const blobName = blob.name;
            const blobClient = containerClient.getBlockBlobClient(blobName);
            const blobUrl = blobClient.url;            
            const blobProperties = await blobClient.getProperties();
            const metadata = blobProperties.metadata;

            if (blobName.includes(searchText)) {
                blobs.push({ name: blobName, url: blobUrl, metadata: metadata });
            } else {    
                for (const [key, value] of Object.entries(metadata)) {
                    if (value.toLowerCase().includes(searchText.toLowerCase())) {
                        blobs.push({ name: blobName, url: blobUrl, metadata: metadata });
                        break;
                    }
                }
            }
        }
        res.send(blobs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});