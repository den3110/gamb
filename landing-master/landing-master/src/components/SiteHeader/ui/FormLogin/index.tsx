'use client';

import { useContext, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Avatar, Button, Dropdown, Form, Grid, Input, Modal } from 'antd';
import { useTranslations } from 'next-intl';

import { loginAPI } from '@/api/auth';
import { getGameCategories } from '@/api/game';
import { getUserInfo } from '@/api/user';
import NotificationCtx from '@/contexts/NotificationCtx';
import { afterLogin, logout } from '@/helpers/auth';
import useUser from '@/hooks/useUser';
import { isStatusCodeSuccess } from '@/util/api';

import style from './style.module.css';

export default function FormLogin() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const [form] = Form.useForm();
  const [mobileForm] = Form.useForm();
  const t = useTranslations('header');
  const screen = Grid.useBreakpoint();
  const { notifi } = useContext(NotificationCtx);
  const { user, setUser } = useUser();

  const handleLogin = async (data: any) => {
    setBtnLoading(true);
    try {
      const loginEp = await loginAPI(data);
      if (isStatusCodeSuccess(loginEp.statusCode)) {
        afterLogin(loginEp.data.access_token);
        notifi?.success({
          message: t('Logged in successfully'),
          placement: 'top',
        });
        const userInfoEp = await getUserInfo();
        const user = userInfoEp?.data || ({} as any);
        setUser(user);
        const gameCategories = await getGameCategories();
        const gameCategoryDefault =
          gameCategories.find((cat) => cat.isDefault) || gameCategories?.[0];
        const url = `/${gameCategoryDefault.id}`;

        window.location.href = url;

        setBtnLoading(false);
        return;
      }
      notifi?.error({
        message: t('Wrong account or password'),
        placement: 'top',
      });
      setBtnLoading(false);
    } catch (err) {
      notifi?.error({
        message: t('Wrong account or password'),
        placement: 'top',
      });
      setBtnLoading(false);
    }
  };

  if (user?.id) {
    return (
      <div className="flex gap-2 items-center">
        <span>{user?.username}</span>
        <Dropdown
          trigger={['click']}
          menu={{
            onClick: () => {
              logout();
            },
            items: [
              {
                key: '1',
                label: t('Logout'),
              },
            ],
          }}
        >
          <Avatar size="large" className="bg-[#f56a00] cursor-pointer" />
        </Dropdown>
      </div>
    );
  }

  return (
    <>
      {!screen.lg ? (
        <div>
          <span className={style.text_mobile}>
            <span className="bg-white px-1">Máy tính để bàn</span>
          </span>
          <div className="flex gap-3">
            <Button type="primary" className="bg-[#FF7144] hover:!bg-[#FF7144]">
              {t('join_now')}
            </Button>
            <Button
              type="primary"
              className="bg-[#F1002A] hover:!bg-[#F1002A]"
              onClick={() => setIsShowLoginModal(true)}
            >
              {t('login')}
            </Button>
          </div>
        </div>
      ) : (
        <Form
          form={form}
          layout="inline"
          onFinish={handleLogin}
          className="pt-4"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '' }]}
            className="!me-3 !mb-0"
          >
            <Input
              placeholder={t('username')}
              className="bg-[#eee] min-w-[242px]"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '' }]}
            className="!me-3 !mb-0"
          >
            <Input.Password
              placeholder={t('password')}
              className="input_password_header min-w-[242px]"
            />
          </Form.Item>
          <Form.Item className="!me-3">
            <Button
              type="primary"
              className="min-w-[125px] bg-[#F1002A] hover:!bg-[#F1002A]"
              htmlType="submit"
              loading={btnLoading}
            >
              {t('login')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="min-w-[125px] bg-[#FF7144] hover:!bg-[#FF7144]"
            >
              {t('join_now')}
            </Button>
          </Form.Item>
        </Form>
      )}

      <Modal
        title="Đăng nhập"
        open={isShowLoginModal}
        footer={null}
        onCancel={() => setIsShowLoginModal(false)}
        centered
      >
        <Form form={mobileForm} size="large" layout="vertical" className="pt-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '' }]}
            className="!mb-4"
          >
            <Input placeholder={t('username')} className="bg-[#eee]" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '' }]}
            className="!mb-4"
          >
            <Input.Password
              placeholder={t('password')}
              className="input_password_header"
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              type="primary"
              className="w-full bg-[#FF7144] hover:!bg-[#FF7144]"
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
