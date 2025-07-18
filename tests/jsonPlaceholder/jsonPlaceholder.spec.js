const { test, expect } = require('@playwright/test');
const { isSortedAscending } = require('../../utils/sortUtils');
const { randomString } = require('../../utils/randomUtils');

test('GET /posts returns JSON and posts are sorted ascending by ID', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const posts = await response.json();
  expect(isSortedAscending(posts, 'id')).toBeTruthy();
});

test('GET /posts/99 returns correct post information', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/99');
  expect(response.status()).toBe(200);
  const post = await response.json();
  expect(post.userId).toBe(10);
  expect(post.id).toBe(99);
  expect(post.title).toBeTruthy();
  expect(post.body).toBeTruthy();
});

test('GET /posts/150 returns 404 and empty body', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/150');
  expect(response.status()).toBe(404);
  const body = await response.text();
  expect(body).toBe('{}');
});

test('POST /posts creates a post with correct data and returns 201', async ({ request }) => {
  const title = randomString(10);
  const body = randomString(20);
  const userId = 1;
  const postData = { title, body, userId };

  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: postData,
  });
  expect(response.status()).toBe(201);
  const post = await response.json();
  expect(post.title).toBe(title);
  expect(post.body).toBe(body);
  expect(post.userId).toBe(userId);
  expect(post.id).toBeDefined();
});

test('GET /users returns JSON and user id=5 has correct data', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const users = await response.json();
  const user5 = users.find(u => u.id === 5);
  expect(user5).toBeDefined();
  expect(user5).toMatchObject({
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: '-31.8129',
        lng: '62.5342',
      },
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: {
      name: 'Keebler LLC',
      catchPhrase: 'User-centric fault-tolerant solution',
      bs: 'revolutionize end-to-end systems',
    },
  });
});

test('GET /users/5 returns correct user data', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/5');
  expect(response.status()).toBe(200);
  const user = await response.json();
  expect(user).toMatchObject({
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: '-31.8129',
        lng: '62.5342',
      },
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: {
      name: 'Keebler LLC',
      catchPhrase: 'User-centric fault-tolerant solution',
      bs: 'revolutionize end-to-end systems',
    },
  });
}); 

