import { Controller, Post, Body} from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller()
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post()
  async handlePostRequest(@Body() body: any): Promise<any> {
    const receivedString = body?.data ?? '';
    console.log('✅ Пришёл запрос...');

    if (!this.crmService.getBaseDomain() || !this.crmService.getAccessToken()) {
      await this.crmService.getToken();
      console.log('✅ Авторизируемся...');
    }

    const data = await this.crmService.createEntity(receivedString);
    console.log('✅ Данные отправлены!');

    return data;
  }
}