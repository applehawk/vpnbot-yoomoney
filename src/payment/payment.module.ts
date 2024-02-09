import { Module, forwardRef } from '@nestjs/common';
import { Payment, PaymentSchema } from './schemas/payment.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentStrategyFactory } from './strategies/factory/payment-strategy.factory';
import { UserModule } from 'src/user/user.module';
import { YooMoneyClientModule } from '@app/yoomoney-client';
import { PaymentController } from './payment.controller';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    UserModule,
    YooMoneyClientModule,
    forwardRef(() => AppModule)
  ],
  providers: [PaymentService, PaymentStrategyFactory],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
