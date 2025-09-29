import { Button, Modal, List, message, Typography, Card, Space, Badge } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart, clearCart } from "../utils";
import { ShoppingCartOutlined, CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

// Function to format cart items for display
const formatCartItems = (items) => {
  return items.map(item => ({
    name: item.menu_item_name,
    price: parseFloat(item.price),
    quantity: item.quantity,
    description: item.menu_item_description,
    imageUrl: item.menu_item_image_url
  }));
};

const MyCart = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [clearing, setClearing] = useState(false);

  // get ths shopping cart data
  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    setLoading(true);
    getCart()
      .then((data) => {
        setCartData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible]);

  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        message.success("Successfully checkout");
        setCartVisible(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  const onClearCart = () => {
    setClearing(true);
    clearCart()
      .then(() => {
        message.success("Cart cleared successfully");
        // Refresh cart data
        getCart()
          .then((data) => {
            setCartData(data);
          })
          .catch((err) => {
            message.error(err.message);
          });
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setClearing(false);
      });
  };

  const onCloseDrawer = () => {
    setCartVisible(false);
  };

  const onOpenDrawer = () => {
    setCartVisible(true);
  };

  const itemCount = cartData?.order_items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <>
      <Badge count={itemCount} size="small" offset={[-5, 5]}>
        <Button 
          type="primary" 
          shape="round" 
          onClick={onOpenDrawer}
          className="modern-button"
          style={{
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            border: "none",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            height: "40px",
            padding: "0 20px",
            fontWeight: "600"
          }}
          icon={<ShoppingCartOutlined />}
        >
          Cart
        </Button>
      </Badge>
      
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShoppingCartOutlined style={{ color: "#667eea", fontSize: "20px" }} />
            <Title level={3} style={{ margin: 0, color: "#2d3748" }}>
              My Shopping Cart
            </Title>
            {itemCount > 0 && (
              <Badge count={itemCount} style={{ backgroundColor: "#667eea" }} />
            )}
          </div>
        }
        open={cartVisible}
        onCancel={onCloseDrawer}
        width={600}
        centered={false}
        style={{ top: 20 }}
        footer={
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "16px 0"
          }}>
            <div>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Total ({itemCount} items)
              </Text>
              <div>
                <Text strong style={{ fontSize: "24px", color: "#667eea" }}>
                  ${cartData?.total_price || "0.00"}
                </Text>
              </div>
            </div>
            <Space>
              <Button 
                onClick={onCloseDrawer} 
                style={{ 
                  borderRadius: "12px",
                  height: "44px",
                  padding: "0 24px",
                  fontWeight: "600"
                }}
              >
                Continue Shopping
              </Button>
              {itemCount > 0 && (
                <Button
                  onClick={onClearCart}
                  loading={clearing}
                  disabled={loading || checking}
                  style={{
                    borderRadius: "12px",
                    height: "44px",
                    padding: "0 24px",
                    fontWeight: "600",
                    borderColor: "#ff4d4f",
                    color: "#ff4d4f"
                  }}
                  icon={<DeleteOutlined />}
                >
                  {clearing ? "Clearing..." : "Clear Cart"}
                </Button>
              )}
              <Button
                onClick={onCheckOut}
                type="primary"
                loading={checking}
                disabled={loading || itemCount === 0}
                className="modern-button"
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  border: "none",
                  borderRadius: "12px",
                  height: "44px",
                  padding: "0 24px",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
                }}
                icon={<CreditCardOutlined />}
              >
                {checking ? "Processing..." : "Checkout"}
              </Button>
            </Space>
          </div>
        }
      >
        {itemCount === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 20px",
            color: "#718096"
          }}>
            <ShoppingCartOutlined style={{ fontSize: "64px", marginBottom: "16px", opacity: 0.5 }} />
            <Title level={4} style={{ color: "#718096", marginBottom: "8px" }}>
              Your cart is empty
            </Title>
            <Text type="secondary">
              Add some delicious items to get started!
            </Text>
          </div>
        ) : (
          <List
            loading={loading}
            itemLayout="vertical"
            dataSource={formatCartItems(cartData?.order_items || [])}
            renderItem={(item, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: "12px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <Title level={5} style={{ margin: 0, color: "#2d3748" }}>
                      {item.name}
                      {item.quantity > 1 && (
                        <Badge 
                          count={`x${item.quantity}`} 
                          style={{ 
                            marginLeft: "8px", 
                            backgroundColor: "#667eea",
                            fontSize: "12px"
                          }} 
                        />
                      )}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                      {item.description || "Fresh and delicious"}
                    </Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Text strong style={{ fontSize: "18px", color: "#667eea" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    {item.quantity > 1 && (
                      <div>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          ${item.price} each
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          />
        )}
      </Modal>
    </>
  );
};

export default MyCart;