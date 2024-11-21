import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async registerUser(@Body() body: { username: string; password: string }) {
        await this.authService.registerUser(body.username, body.password);
        return { message: 'User registered successfully.' };
    }

    @Post('login')
    async loginUser(@Body() body: { username: string; password: string }) {
        const token = await this.authService.loginUser(body.username, body.password);
        return { token };
    }
}