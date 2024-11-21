import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleService {
    async exportClients(clients: any[]) {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const resource = { properties: { title: 'Clients Data' } };
        const spreadsheet = await sheets.spreadsheets.create({
            resource,
            fields: 'spreadsheetId',
        });

        const spreadsheetId = spreadsheet.data.spreadsheetId;

        const headers = ['id', 'firstName', 'lastName', 'gender', 'address', 'city', 'phone', 'email', 'status'];
        const rows = clients.map((client) => [
            client.id,
            client.firstName,
            client.lastName,
            client.gender,
            client.address,
            client.city,
            client.phone,
            client.email,
            client.status,
        ]);

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource: { values: [headers, ...rows] },
        });

        console.log('Clients exported to Google Sheets:', spreadsheetId);
    }
}