import { Layout, Typography, Space } from "antd";
import { useState, useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import FoodList from "./components/FoodList";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";
import { getCart } from "./utils";
import "./App.css";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get cart data - if successful, user is authenticated
        await getCart();
        setAuthed(true);
      } catch (error) {
        // If cart request fails, user is not authenticated
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Layout style={{ height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100vh",
          flexDirection: "column"
        }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }}>
            <ShoppingCartOutlined style={{ fontSize: "48px", color: "#667eea", marginBottom: "1rem" }} />
            <Title level={3} style={{ 
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Loading FoodEase...
            </Title>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout style={{ height: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Header 
        style={{ 
          background: "rgba(255, 255, 255, 0.95)", 
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <Space align="center">
            <ShoppingCartOutlined style={{ color: "#667eea", fontSize: "24px", marginRight: "12px" }} />
            <Title
              level={2}
              style={{ 
                color: "#2d3748", 
                lineHeight: "inherit", 
                marginBottom: 0,
                fontSize: "28px",
                fontWeight: "700",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              FoodEase
            </Title>
          </Space>
          <div>{authed ? <MyCart /> : <SignupForm />}</div>
        </div>
      </Header>
      <Content
        style={{
          padding: "24px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
          background: "transparent"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {authed ? (
            <FoodList />
          ) : (
            <LoginForm onSuccess={() => setAuthed(true)} />
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default App;