import { injectable } from '@clean-js/presenter';
import { User } from '../entity/user';

@injectable()
export class UserService {
  constructor(private user: User) {}

  /**
   * 手机号验证码登录
   */
  loginWithMobile(mobile: string, code: string) {
    // mock 请求接口登录
    return new Promise((resolve) => {
      setTimeout(() => {
        this.user.from({
          token: 'abcdefg',
        });

        resolve(true);
      }, 1000);
    });
  }

  updateUserInfo() {
    // mock 请求接口登录
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        this.user.from({
          avatar:
            'https://p3-passport.byteimg.com/img/user-avatar/2245576e2112372252f4fbd62c7c9014~180x180.awebp',
          introduction: '欢乐堡什么都有，唯独没有欢乐',
          username: '鱼露',
          role: 'member',
        });

        resolve(this.user);
      }, 1000);
    });
  }
}
