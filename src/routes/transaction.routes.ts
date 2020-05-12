import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';

const transactionRouter = Router();

transactionRouter.get('/', async (request, response) => {
  try {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();
    const balance = await transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category: category_name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({
      category_name,
    });

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category_id: category.id,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
