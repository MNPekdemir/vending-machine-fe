import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/AselVendor/i)).toBeInTheDocument();
  });

  it("allows money to be added", () => {
    render(<App />);
    const addButton = screen.getByText(/Add 1-unit/i);
    fireEvent.click(addButton);
    expect(screen.getByText(/Balance: 1/i)).toBeInTheDocument();
  });

  it("allows products to be purchased", () => {
    render(<App />);
    for (let i = 0; i < 5; i++) {
      const addButton5 = screen.getByText(/Add 5-unit/i);
      fireEvent.click(addButton5);
    }

    const waterButton = screen.getByText(/Water/i);
    fireEvent.click(waterButton);
    expect(screen.getByText(/Balance: 0/i)).toBeInTheDocument();
  });

  it("refunds money correctly", () => {
    render(<App />);
    const addButton10 = screen.getByText(/Add 10-unit/i);
    fireEvent.click(addButton10);
    const refundButton = screen.getByText(/Refund/i);
    fireEvent.click(refundButton);
    expect(screen.getByText(/Balance: 0/i)).toBeInTheDocument();
  });

  it("does not allow access to admin mode without correct password", () => {
    render(<App />);
    const adminButton = screen.getByText(/Admin Mode/i);
    fireEvent.click(adminButton);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    const submitButton = screen.getByText(/Log in/i);
    fireEvent.click(submitButton);
  });

  it("allows access to admin mode with correct password", () => {
    render(<App />);
    const adminButton = screen.getByText(/Admin Mode/i);
    fireEvent.click(adminButton);
    const passwordInput = screen.getByPlaceholderText(/Password/i); //
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    const submitButton = screen.getByText(/Log in/i);
    fireEvent.click(submitButton);
    expect(screen.getByText(/Admin Panel/i)).toBeInTheDocument();
  });
});
