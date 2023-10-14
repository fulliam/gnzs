import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

@Injectable()
export class CrmService {

  private accessToken: string;
  private baseDomain: string;
  private clientId: string;

  constructor() {
    dotenv.config();
    this.clientId = process.env.CLIENT_ID;
  }

  getBaseDomain(): string {
    return this.baseDomain;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  async getToken(): Promise<void> {
    const url = 'https://test.gnzs.ru/oauth/get-token.php';

    try {
      const response = await axios.get(url, {
        headers: {
          'X-Client-Id': this.clientId,
        },
      });

      this.accessToken = response.data.access_token;
      this.baseDomain = response.data.base_domain;
    } catch (error) {
      console.error(error);
    }
  }

  async createEntity(entityType: string): Promise<number> {
    const url = `https://${this.baseDomain}/api/v4/${entityType}`;

    try {
      const response = await axios.post(
        url,
        {
          "name": [`new ${entityType}()`], // data?
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data._embedded;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}