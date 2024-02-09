import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const token = ApiKey.create().uuid;
    return this.userModel.create({ ...user, token });
  }

  async upsert(user: User): Promise<User> {
    const { userId } = user;
    const existUser = await this.findOneByUserId(userId);
    if (existUser) {
      await this.userModel.updateOne({ userId }, user);
      return this.findOneByUserId(userId);
    } else {
      return this.create(user);
    }
  }

  async update(userId: number, user: Partial<User>): Promise<User> {
    await this.userModel.updateOne({ userId }, user);
    return this.findOneByUserId(user.userId);
  }

  async findOneByUserId(userId: number): Promise<User> {
    return this.userModel.findOne({ userId }).populate('tariffId').lean();
  }

  async findUsersInChat(): Promise<(User)[]> {
    return this.userModel.find({ inChat: true }).populate('tariffId').lean();
  }

  async existUserInChat(userId: number): Promise<boolean> {
    const user = await this.findOneByUserId(userId);
    return !!user?.inChat;
  }

  async blockUser(userId: number, inChat: boolean): Promise<User> {
    const user = await this.findOneByUserId(userId);
    if (!user) return null;
    return this.update(userId, {
      inChat,
    });
  }
  
}
