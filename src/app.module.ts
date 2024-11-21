import { Module } from '@nestjs/common';
import {ClientsModule} from "./clients/clients.module";
import {AuthModule} from "./auth/auth.module";
import {GoogleModule} from "./google/google.module";

@Module({
  imports: [AuthModule, ClientsModule, GoogleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
