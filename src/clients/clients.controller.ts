import {Controller, Get, Post} from "@nestjs/common";
import {ClientsService} from "./clients.service";

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    async getClients(@Headers('Authorization') token: string) {
        const bearerToken = token?.split(' ')[1];
        if (!bearerToken) throw new Error('Authorization token missing.');
        return this.clientsService.getClients(bearerToken);
    }

    @Post('export')
    async exportClients(@Headers('Authorization') token: string) {
        const bearerToken = token?.split(' ')[1];
        if (!bearerToken) throw new Error('Authorization token missing.');
        await this.clientsService.exportClients(bearerToken);
        return { message: 'Clients exported successfully to Google Sheets.' };
    }
}