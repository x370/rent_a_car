'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ConfigProvider, theme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 12,
          fontFamily: 'inherit',
          colorTextBase: resolvedTheme === 'dark' ? '#ffffff' : '#111111',
          colorBgBase: resolvedTheme === 'dark' ? '#050505' : '#ffffff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <AntdRegistry>
        <AntdConfigProvider>
          {children}
        </AntdConfigProvider>
      </AntdRegistry>
    </NextThemesProvider>
  );
}
