import { User } from './user';

it('init', () => {
  const u = new User();
  u.from({
    username: 'lujs',
  });
  expect(u.username).toBe('lujs');
});
