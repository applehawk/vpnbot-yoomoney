import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  userId: number;

  @Prop()
  chatId?: number;

  @Prop({
    default: () => 0,
  })
  requestsUsed?: number;

  @Prop({
    default: () => false,
  })
  inChat?: boolean;

  @Prop({ isOptional: true })
  isSubscribed?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
