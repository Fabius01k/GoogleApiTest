import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import {GoogleModule} from "../google/google.module";

@Module({
    imports: [GoogleModule],
    controllers: [ClientsController],
    providers: [ClientsService],
})
export class ClientsModule {}