import { NotFoundException } from '@nestjs/common';

export default class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super('category not found');
  }
}
