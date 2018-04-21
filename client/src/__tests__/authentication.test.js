const db = require('../../../database/database.js');
const server = require('../../../server/index.js');
const axios = require('axios');

const PORT = process.env.PORT || 4446;
const URL = `http://127.0.0.1:${PORT}`;

beforeAll(() => server.listen(`Test Server is listening on ${PORT}`));

afterAll(() => {
  server.close();
  db.connection.close();
  
  console.log('closed db and server');
});

test('should create an account when user signs up', () => {
  const fakeUsername = 'FAKE_USERNAME' + Math.random();
  axios.post(
    `${URL}/signup`, 
    {
      firstName: 'FAKE',
      lastName: 'USER',
      username: fakeUsername,
      password: 'PASSWORD'
    }
  )
  .then(() => db.fetchUser(fakeUsername))
  .then((user) => expect(user.username).toBe('FAKE_USERNAME'));
});