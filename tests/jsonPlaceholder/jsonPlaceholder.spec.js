const { test, expect } = require('@playwright/test');
const { isSortedAscending } = require('../../utils/sortUtils');
const { randomString } = require('../../utils/randomUtils');
const user5 = require('../../test-data/user5');
const apiPaths = require('../../test-data/apiPaths');
const { StatusCodes } = require('http-status-codes');

const USER_ID_5 = 5;
const USER_ID_10 = 10;
const POST_ID_99 = 99;
const POST_ID_150 = 150;
const CONTENT_TYPE_JSON = 'application/json';
const EMPTY_BODY = '{}';

test('GET /posts returns JSON and posts are sorted ascending by ID', async ({ request }) => {
  const response = await request.get(apiPaths.posts);
  expect(response.status()).toBe(StatusCodes.OK);
  expect(response.headers()['content-type']).toContain(CONTENT_TYPE_JSON);
  const posts = await response.json();
  expect(isSortedAscending(posts, 'id')).toBeTruthy();
});

test('GET /posts/99 returns correct post information', async ({ request }) => {
  const response = await request.get(apiPaths.post(POST_ID_99));
  expect(response.status()).toBe(StatusCodes.OK);
  const post = await response.json();
  expect(post.userId).toBe(USER_ID_10);
  expect(post.id).toBe(POST_ID_99);
  expect(post.title).toBeTruthy();
  expect(post.body).toBeTruthy();
});

test('GET /posts/150 returns 404 and empty body', async ({ request }) => {
  const response = await request.get(apiPaths.post(POST_ID_150));
  expect(response.status()).toBe(StatusCodes.NOT_FOUND);
  const body = await response.text();
  expect(body).toBe(EMPTY_BODY);
});

test('POST /posts creates a post with correct data and returns 201', async ({ request }) => {
  const title = randomString(10);
  const body = randomString(20);
  const userId = 1;
  const postData = { title, body, userId };

  const response = await request.post(apiPaths.posts, {
    data: postData,
  });
  expect(response.status()).toBe(StatusCodes.CREATED);
  const post = await response.json();
  expect(post.title).toBe(title);
  expect(post.body).toBe(body);
  expect(post.userId).toBe(userId);
  expect(post.id).toBeDefined();
});

test('GET /users returns JSON and user id=5 has correct data', async ({ request }) => {
  const response = await request.get(apiPaths.users);
  expect(response.status()).toBe(StatusCodes.OK);
  expect(response.headers()['content-type']).toContain(CONTENT_TYPE_JSON);
  const users = await response.json();
  const user = users.find(u => u.id === USER_ID_5);
  expect(user).toBeDefined();
  expect(user).toMatchObject(user5);
});

test('GET /users/5 returns correct user data', async ({ request }) => {
  const response = await request.get(apiPaths.user(USER_ID_5));
  expect(response.status()).toBe(StatusCodes.OK);
  const user = await response.json();
  expect(user).toMatchObject(user5);
}); 
