'use client';

import Navbar from '@/components/Navbar';
import { Typography, Row, Col, Card, Form, Input, Button, Space, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Thank you for contacting us! We will get back to you soon.');
    form.resetFields();
  };

  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title className="animate-fade-in">Contact <span style={{ color: 'var(--primary)' }}>Us</span></Title>
          <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '800px', margin: '0 auto' }}>
            Have a question or need assistance? Our team is here to help you 24/7.
          </Paragraph>
        </div>

        <Row gutter={[48, 48]}>
          <Col xs={24} md={10}>
            <Title level={2}>Get in Touch</Title>
            <Paragraph style={{ marginBottom: '2rem' }}>
              Feel free to reach out to us through any of the following channels or use the contact form.
            </Paragraph>
            
            <Space orientation="vertical" size="large" style={{ width: '100%' }}>
              <Card className="glass" style={{ border: 'none' }}>
                <Space>
                  <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px', display: 'flex' }}>
                    <MailOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />
                  </div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Email</Text>
                    <Text type="secondary">support@luxedrive.com</Text>
                  </div>
                </Space>
              </Card>

              <Card className="glass" style={{ border: 'none' }}>
                <Space>
                  <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px', display: 'flex' }}>
                    <PhoneOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />
                  </div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Phone</Text>
                    <Text type="secondary">+1 (555) 123-4567</Text>
                  </div>
                </Space>
              </Card>

              <Card className="glass" style={{ border: 'none' }}>
                <Space>
                  <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px', display: 'flex' }}>
                    <EnvironmentOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />
                  </div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Address</Text>
                    <Text type="secondary">123 Luxury Lane, Beverly Hills, CA 90210</Text>
                  </div>
                </Space>
              </Card>
            </Space>
          </Col>

          <Col xs={24} md={14}>
            <Card className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input placeholder="John Doe" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input placeholder="john@example.com" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter a subject' }]}
                >
                  <Input placeholder="How can we help?" size="large" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea placeholder="Your message here..." rows={6} />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    icon={<SendOutlined />} 
                    block
                    style={{ height: '50px', fontWeight: 'bold' }}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}
