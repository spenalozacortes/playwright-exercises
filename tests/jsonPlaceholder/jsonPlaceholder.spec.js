const { test, expect } = require('@playwright/test');
const { isSortedAscending } = require('../../utils/sortUtils');

test('GET /posts returns JSON and posts are sorted ascending by ID', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');

  const posts = await response.json();
  expect(isSortedAscending(posts, 'id')).toBeTruthy();
}); 

