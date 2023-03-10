import { singleton } from '@clean-js/presenter';

@singleton()
export class User {
  username = '';
  avatar = '';
  introduction = '';

  role = 'member';
  token = '';

  init(data: Partial<Omit<User, 'init'>>) {
    Object.assign(this, data);
  }
}
