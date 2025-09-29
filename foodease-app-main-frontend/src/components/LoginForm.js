import { Button, Form, Input, message, Typography, Card } from "antd";
import React from "react";
import { LockOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { login } from "../utils";

const { Title, Text } = Typography;

class LoginForm extends React.Component {
  state = {
    loading: false,
  };

  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    login(data)
      .then(() => {
        message.success(`Login Successful`);
        this.props.onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render = () => {
    return (
      <div className="fade-in" style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "60vh",
        padding: "2rem"
      }}>
        <Card 
          className="modern-card"
          style={{ 
            width: "100%", 
            maxWidth: 400,
            textAlign: "center"
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <div style={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
            }}>
              <LoginOutlined style={{ color: "white", fontSize: "32px" }} />
            </div>
            <Title level={2} style={{ 
              marginBottom: "0.5rem",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Welcome Back
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Sign in to your account to continue
            </Text>
          </div>

          <Form
            name="normal_login"
            onFinish={this.onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: "#667eea" }} />} 
                placeholder="Username"
                style={{
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  padding: "12px 16px",
                  fontSize: "16px"
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: "#667eea" }} />} 
                placeholder="Password"
                style={{
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  padding: "12px 16px",
                  fontSize: "16px"
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={this.state.loading}
                className="modern-button"
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
                }}
                icon={<LoginOutlined />}
              >
                {this.state.loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };
}

export default LoginForm;