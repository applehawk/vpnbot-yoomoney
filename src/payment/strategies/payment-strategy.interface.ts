import { PaymentStatusEnum } from '../enum/payment-status.enum';
import { Payment } from '../schemas/payment.schema';

export type CreatePaymentData = {
  userId: number;
  chatId: number;
  email?: string;
  paymentAmount: number;
  paymentAt?: Date;
};
export interface PaymentStrategy {
  createPayment(data: CreatePaymentData): Promise<Payment>;
  validateTransaction(paymentId: string): Promise<PaymentStatusEnum>;
}
