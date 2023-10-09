import React, { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [stock, setStock] = useState({
    Water: 10,
    Coke: 10,
    Soda: 10,
  });
  const [prices, setPrices] = useState({
    Water: 25,
    Coke: 35,
    Soda: 45,
  });

  const [totalMoney, setTotalMoney] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const productImages = {
    Water: process.env.PUBLIC_URL + "/images/water.png",
    Coke: process.env.PUBLIC_URL + "/images/cola.png",
    Soda: process.env.PUBLIC_URL + "/images/soda.png",
  };
  const addMoney = (amount) => {
    setNotification("");
    setBalance((prevBalance) => prevBalance + amount);
  };
  const refundMoney = () => {
    alert(`Refunded ${balance}-unit money.`);
    setBalance(0);
  };
  const purchaseProduct = (productName) => {
    const productCost = prices[productName];
    if (balance < productCost) {
      setNotification("Insufficient balance! Please add money.");
    } else if (stock[productName] <= 0) {
      setNotification(`${productName} stokta kalmadı!`);
    } else {
      setBalance((prevBalance) => prevBalance - productCost);
      setStock((prevStock) => ({
        ...prevStock,
        [productName]: prevStock[productName] - 1,
      }));
      setTotalMoney((prevTotalMoney) => prevTotalMoney + productCost);
      setNotification("");
    }
  };
  const changeProductPrice = (productName, changeType) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [productName]:
        changeType === "raise"
          ? Math.ceil(prevPrices[productName] * 1.1)
          : Math.ceil(prevPrices[productName] * 0.9),
    }));
  };
  const resetMachine = () => {
    setStock({ Water: 10, Coke: 10, Soda: 10 });
    setPrices({ Water: 25, Coke: 35, Soda: 45 });
    setBalance(0);
    setTotalMoney(0);
  };
  const collectMoney = () => {
    alert(`Collected ${totalMoney}-unit money.`);
    setTotalMoney(0);
  };
  const addStock = (productName) => {
    setStock((prevStock) => ({
      ...prevStock,
      [productName]: prevStock[productName] + 1,
    }));
  };
  const [temperatureMessage, setTemperatureMessage] = useState("");

  const checkTemperature = () => {
    // Sadece temsili bir sıcaklık kontrolü
    const currentTemperature = Math.random() * 10; // 0°C ile 10°C arasında rastgele bir sıcaklık

    if (currentTemperature < 2 || currentTemperature > 8) {
      setTemperatureMessage(
        "The products have been cooled, and they are now at the right temperature!"
      );
    } else {
      setTemperatureMessage(
        "The products are already at the right temperature!"
      );
    }
  };

  const handleAdminAccess = () => {
    if (passwordInput === "1234") {
      setIsAdminMode(true);
      setIsPasswordModalOpen(false);
    } else {
      alert("Wrong Password!");
      setIsPasswordModalOpen(false);
    }
  };

  if (isPasswordModalOpen) {
    return (
      <div className="App password-modal">
        <h2>Admin </h2>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleAdminAccess}>Log in</button>
      </div>
    );
  }

  if (isAdminMode) {
    return (
      <div className="App admin">
        <h1>Admin Panel</h1>
        <div className="admin-controls">
          {Object.keys(prices).map((productName) => (
            <div key={productName} className="admin-product-item">
              <span>
                {productName} | Stock: {stock[productName]}
              </span>
              <input
                type="number"
                value={prices[productName]}
                onChange={(e) =>
                  setPrices({
                    ...prices,
                    [productName]: parseInt(e.target.value),
                  })
                }
              />
              <button
                onClick={() => changeProductPrice(productName, "discount")}
                className="discount-button"
              >
                10% Discount
              </button>
              <button
                onClick={() => changeProductPrice(productName, "raise")}
                className="raise-button"
              >
                10% Raise
              </button>
              <button
                onClick={() => addStock(productName)}
                className="add-stock-button"
              >
                Add Stock
              </button>
            </div>
          ))}
          <div>
            <span>Total Money: {totalMoney}</span>
            <button onClick={collectMoney} className="collect-money-button">
              Collect Money
            </button>
            <button onClick={resetMachine} className="reset-machine-button">
              Reset Machine
            </button>
          </div>
          <button onClick={() => setIsAdminMode(false)}>
            Back to User Mode
          </button>
          <button
            onClick={checkTemperature}
            className="check-temperature-button"
          >
            Check Temperature
          </button>
          {temperatureMessage && <p>{temperatureMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="App user">
      <h1>AselVendor</h1>
      <h2>Balance: {balance}</h2>
      {notification && <p style={{ color: "red" }}>{notification}</p>}
      <div className="money-buttons">
        {[1, 5, 10, 20].map((amount) => (
          <button
            key={amount}
            className="add-money-button"
            onClick={() => addMoney(amount)}
          >
            Add {amount}-unit
          </button>
        ))}
        <button className="refund-button" onClick={refundMoney}>
          Refund
        </button>
      </div>
      <div className="products">
        {Object.keys(stock).map((productName) => (
          <div key={productName} className="product-item">
            <button
              className="product-button"
              onClick={() => purchaseProduct(productName)}
            >
              <img
                src={productImages[productName]}
                alt={productName}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              {productName} ({prices[productName]}-unit) | Stock:{" "}
              {stock[productName]}
            </button>
          </div>
        ))}
      </div>
      <button
        className="admin-mode-button"
        onClick={() => setIsPasswordModalOpen(true)}
      >
        Admin Mode
      </button>
    </div>
  );
}

export default App;
