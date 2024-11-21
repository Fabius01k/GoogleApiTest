import {Injectable} from "@nestjs/common";
import axios from 'axios';
import {GoogleService} from "../google/google.service";


const API_URL = process.env.API_URL

@Injectable()
export class ClientsService {
    constructor(private readonly googleSheetsService: GoogleService) {}

    async getClients(token: string): Promise<any[]> {
        try {
            const response = await axios.get(`${API_URL}/clients`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Error fetching clients.');
        }
    }

    async exportClients(token: string): Promise<void> {
        const clients = await this.getClients(token);
        await this.googleSheetsService.exportClients(clients);
    }
}