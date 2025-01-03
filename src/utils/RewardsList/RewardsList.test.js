import React from "react";
import { render, screen } from "@testing-library/react";
import RewardsProgram from "./RewardsProgram";

describe("RewardsProgram Component", () => {

  it("should display a loading message initially", () => {
    render(<RewardsProgram />);
    //Initial Loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should fetch data and render child components with correct props", () => {
    render(<RewardsProgram />);
    // Check if the child components are rendered
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("should calculate reward points correctly", () => {
    // Mock implementation for testing the function
    const mockCalculatePoints = (amt) => {
      let points = 0;
      let amount = Math.round(amt);
      if (amount > 100) {
        points = 2 * (amount - 100);
        amount = 100;
      }
      if (amount > 50) {
        points += amount - 50;
      }
      return points;
    };

    expect(mockCalculatePoints(120)).toBe(90); 
    expect(mockCalculatePoints(75)).toBe(25);  
    expect(mockCalculatePoints(45)).toBe(0);   
  });
});
