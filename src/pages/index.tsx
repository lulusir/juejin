import { history } from 'umi';
import { UserService } from '@/module/user/service/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { injectable, Presenter } from '@clean-js/presenter';
import { usePresenter } from '@clean-js/react-presenter';
import { Button, Form, Input, message, Space } from 'antd';

interface IViewState {
  loading: boolean;
  mobile: string;
  code: string;
}
@injectable()
class PagePresenter extends Presenter<IViewState> {
  constructor(private userService: UserService) {
    super();
    this.state = {
      loading: false,
      mobile: '',
      code: '',
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

  login = () => {
    const { mobile, code } = this.state;
    this.showLoading();
    return this.userService
      .loginWithMobile(mobile, code)
      .then((res) => {
        if (res) {
          message.success('登录成功');
        }
      })
      .finally(() => {
        this.hideLoading();
      });
  };
}

export default function LoginPage() {
  const { p } = usePresenter(PagePresenter);

  return (
    <div>
      <Form
        name="normal_login"
        initialValues={{ email: 'admin@admin.com', password: 'admin' }}
        onFinish={() => {
          console.log(p, '==p');
          p.login().then(() => {
            setTimeout(() => {
              history.push('/profile');
            }, 1000);
          });
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
