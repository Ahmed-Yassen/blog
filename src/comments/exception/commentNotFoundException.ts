import { NotFoundException } from '@nestjs/common';

export default class CommentNotFoundException extends NotFoundException {
  constructor() {
    super('comment was not found');
  }
}
