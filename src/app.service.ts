import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.isProd = configService.get('NODE_ENV') === 'production';
  }

  getHello(): string {
    return 'Hello World! NestJS Application';
  }
}
