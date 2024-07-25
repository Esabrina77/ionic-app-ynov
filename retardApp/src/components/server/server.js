import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'pierre.monforte@ynov.com',
        pass: 'Tounout2003',
    },
});

app.post('/send-email', (req, res) => {
    const { pdfData, prenom, nom } = req.body;

    if (!pdfData || !prenom || !nom) {
        return res.status(400).json({ error: 'Missing required data' });
    }

    const base64Data = pdfData.replace('data:application/pdf;base64,', '');

    const mailOptions = {
        from: 'pierre.monforte@ynov.com',
        to: `${prenom}.${nom}@ynov.com`,
        subject: 'Décharge de Sortie',
        text: `Veuillez trouver en pièce jointe le fichier PDF généré par ${prenom} ${nom}.`,
        attachments: [
            {
                filename: 'DéchargeSortie.pdf',
                content: base64Data,
                encoding: 'base64',
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
        return
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
