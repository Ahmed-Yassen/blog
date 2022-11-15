import { NotFoundException } from '@nestjs/common';

export default class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`user with ${userId} doesn't exist`);
  }
}
