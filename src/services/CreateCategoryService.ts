import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category_name: string;
}

class CreateCategoryService {
  public async execute({ category_name }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: {
        category: category_name,
      },
    });

    if (checkCategoryExists) {
      return checkCategoryExists;
    }

    const category = categoriesRepository.create({
      category: category_name,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
