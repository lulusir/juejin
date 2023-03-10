import { UserService } from '@/module/user/service/user';
import { injectable, Presenter } from '@clean-js/presenter';
import { usePresenter } from '@clean-js/react-presenter';
import { Image } from 'antd';
import { useEffect } from 'react';

interface IViewState {
  loading: boolean;
  username: string;
  avatar: string;
  introduction: string;
}

@injectable()
class PagePresenter extends Presenter<IViewState> {
  constructor(private userS: UserService) {
    super();
    this.state = {
      loading: false,
      username: '',
      avatar: '',
      introduction: '',
    };
  }

  _loadingCount = 0;

  showLoading() {
    if (this._loadingCount === 0) {
      this.setState((s) => {
        s.loading = true;
      });
    }
    this._loadingCount += 1;
  }

  hideLoading() {
    this._loadingCount -= 1;
    if (this._loadingCount === 0) {
      this.setState((s) => {
        s.loading = false;
      });
    }
  }

  /**
   * 拉取用户信息
   */
  getUserInfo() {
    this.showLoading();
    this.userS
      .updateUserInfo()
      .then((u) => {
        this.setState((s) => {
          s.avatar = u.avatar;
          s.username = u.username;
          s.introduction = u.introduction;
        });
      })
      .finally(() => {
        this.hideLoading();
      });
  }
}
const ProfilePage = () => {
  const { p } = usePresenter(PagePresenter);

  useEffect(() => {
    p.getUserInfo();
  }, []);

  return (
    <div>
      <p>
        avatar: <Image src={p.state.avatar} width={100} alt="avatar"></Image>
      </p>
      <p>username: {p.state.username}</p>
      <p>introduction: {p.state.introduction}</p>
    </div>
  );
};

export default ProfilePage;
