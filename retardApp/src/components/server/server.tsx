import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

// Créez une instance d'application Express
const app = express();
const port = 3000;

// Middleware pour gérer les en-têtes CORS et le corps de la requête JSON
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Créez un transporteur Nodemailer pour envoyer des e-mails
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'pierre.monforte@ynov.com',
        pass: 'Tounout2003',
    },
});

// Définissez une interface pour les données de la requête
interface SendEmailRequest {
    pdfData: string;
    prenom: string;
    nom: string;
}

// Route POST pour envoyer un e-mail
app.post('/send-email', (req: Request<{}, {}, SendEmailRequest>, res: Response) => {
    const { pdfData, prenom, nom } = req.body;

    if (!pdfData || !prenom || !nom) {
        return res.status(400).json({ error: 'Missing required data' });
    }

    // Nettoyez les données PDF
    const base64Data = pdfData.replace('data:application/pdf;base64,', '');

    // Options pour l'e-mail
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

    // Envoyez l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
    });
});

// Démarrez le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
