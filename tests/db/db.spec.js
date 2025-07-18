import { test, expect } from '@playwright/test';
import { connectToDB } from '../../utils/db.js';

test('verify user from DB', async () => {
  const db = await connectToDB();
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', ['test@example.com']);

  expect(rows.length).toBe(1);
  expect(rows[0].name).toBe('Test User');
});
