import { Button, Form, Input, message, Modal, Typography, Space } from "antd";
import React from "react";
import { LockOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { signup } from "../utils";

const { Title, Text } = Typography;

class SignupForm extends React.Component {
  state = {
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    signup(data)
      .then(() => {
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (
      <>
        <Button 
          shape="round" 
          type="primary" 
          onClick={this.signupOnClick}
          className="modern-button"
          style={{
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            border: "none",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            height: "40px",
            padding: "0 20px",
            fontWeight: "600"
          }}
          icon={<UserAddOutlined />}
        >
          Register
        </Button>
        
        <Modal
          title={null}
          open={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
          width={480}
          style={{ top: 20 }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "2rem",
            textAlign: "center",
            borderRadius: "8px 8px 0 0"
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              backdropFilter: "blur(10px)"
            }}>
              <UserAddOutlined style={{ color: "white", fontSize: "24px" }} />
            </div>
            <Title level={2} style={{ color: "white", margin: 0 }}>
              Create Account
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "16px" }}>
              Join us and start ordering delicious food
            </Text>
          </div>
          
          <div style={{ padding: "2rem" }}>
            <Form
              name="normal_register"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              preserve={false}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: "#667eea" }} />} 
                  placeholder="Email address"
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
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
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
              
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item
                  name="first_name"
                  rules={[
                    { required: true, message: "First name required!" },
                  ]}
                  style={{ width: "50%", marginRight: "8px" }}
                >
                  <Input 
                    placeholder="First name"
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      padding: "12px 16px",
                      fontSize: "16px"
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="last_name"
                  rules={[
                    { required: true, message: "Last name required!" },
                  ]}
                  style={{ width: "50%" }}
                >
                  <Input 
                    placeholder="Last name"
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      padding: "12px 16px",
                      fontSize: "16px"
                    }}
                  />
                </Form.Item>
              </Space.Compact>

              <Form.Item style={{ marginBottom: 0, marginTop: "1.5rem" }}>
                <Button 
                  type="primary" 
                  htmlType="submit"
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
                  icon={<UserAddOutlined />}
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </>
    );
  };
}

export default SignupForm;