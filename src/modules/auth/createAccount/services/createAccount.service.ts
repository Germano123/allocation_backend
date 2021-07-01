import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/shared/models/user.model';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { CreateUserDTO } from '../dtos/createUser.dto';

@Injectable()
export class CreateAccountService {
  constructor(
    @InjectModel('UserModel') private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User | ErrorMessage> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });

    if (user) {
      return new ErrorMessage('This email already has been used');
    }

    const userCreated = new this.userModel(createUserDTO);
    return await userCreated.save();
  }
}
