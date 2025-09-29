import { Button, Card, List, message, Select, Tooltip, Typography, Tag, Space } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined, ShoppingCartOutlined, StarOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => {message.success(`Successfully added to cart!`)})
      .catch((err) => {message.error(err.message)})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
        className="modern-button"
        style={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          border: "none",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
        }}
      />
    </Tooltip>
  );
};

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);

  return (
    <div className="slide-up">
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <Title level={1} style={{ 
          marginBottom: "1rem",
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🍽️ Choose Your Restaurant
        </Title>
        <Select
          value={curRest}
          onSelect={(value) => setCurRest(value)}
          placeholder="Select a restaurant"
          loading={loadingRest}
          style={{ 
            width: 400,
            borderRadius: "12px"
          }}
          size="large"
          onChange={() => {}}
        >
          {restaurants.map((item) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </div>
      
      {curRest && (
        <div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: "2rem" 
          }}>
            <Space align="center">
              <ShoppingCartOutlined style={{ fontSize: "24px", color: "#667eea" }} />
              <Title level={2} style={{ margin: 0, color: "#2d3748" }}>
                Menu Items
              </Title>
            </Space>
          </div>
          
          <List
            loading={loading}
            grid={{
              gutter: [24, 24],
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={foodData}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className="modern-card"
                  hoverable
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
                  }}
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{ 
                          width: "100%", 
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "20px",
                        padding: "4px 8px",
                        backdropFilter: "blur(10px)"
                      }}>
                        <AddToCartButton itemId={item.id} />
                      </div>
                    </div>
                  }
                  actions={[
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      padding: "0 16px"
                    }}>
                      <Space>
                        <StarOutlined style={{ color: "#fbbf24" }} />
                        <Text strong style={{ fontSize: "18px", color: "#667eea" }}>
                          ${item.price}
                        </Text>
                      </Space>
                      <Tag color="blue" style={{ borderRadius: "12px" }}>
                        Available
                      </Tag>
                    </div>
                  ]}
                >
                  <Card.Meta
                    title={
                      <Title level={4} style={{ 
                        margin: 0, 
                        color: "#2d3748",
                        fontSize: "18px",
                        fontWeight: "600"
                      }}>
                        {item.name}
                      </Title>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        Fresh and delicious meal ready for you
                      </Text>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default FoodList;