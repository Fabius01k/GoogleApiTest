import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

const API_URL = process.env.API_URL

@Injectable()
export class AuthService {
    async registerUser(username: string, password: string): Promise<void> {
        try {
            await axios.post(`${API_URL}/auth/registration`, { username, password });
        } catch (error) {
            throw new HttpException(error.response?.data || 'Error registering user.', 500);
        }
    }

    async loginUser(username: string, password: string): Promise<string> {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password });
            return response.data.token;
        } catch (error) {
            throw new HttpException(error.response?.data || 'Error logging in.', 500);
        }
    }
}