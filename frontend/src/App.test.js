import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";
import UsernameModal from "./components/UsernameModal";
import APOD from "./components/APOD";
import axios from "axios";
jest.mock("axios");

beforeEach(() => {
  // Mocking response for EPIC (can mock similarly for other API response to test)
  jest.resetModules();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            identifier: "20230221",
            date: "2023-02-21",
            image: "image_20230221.jpg",
            type: "natural",
          },
        ]),
    })
  );
});

const customRender = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

//APP.js test
describe("App", () => {
  it("renders UsernameModal when no username is stored in localStorage", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    customRender(<App />);
    expect(
      screen.getByText(/Welcome to NASA Exploratory!/i)
    ).toBeInTheDocument();
  });

  it("does not render UsernameModal when username is stored in localStorage", () => {
    Storage.prototype.getItem = jest.fn(() => "Jane Doe");
    customRender(<App />);
    expect(screen.queryByText(/Welcome to NASA Exploratory!/i)).toBeNull();
  });

  it("renders Mars Rover Photos component correctly", () => {
    customRender(<App />, { route: "/mars-rover" });
    expect(screen.getByText(/Mars Rover Photos/i)).toBeInTheDocument();
  });

  it("renders EPIC component correctly", async () => {
    Storage.prototype.getItem = jest.fn(() => "Jane Doe");
    customRender(<App />, { route: "/epic" });
    const imageText = await screen.findByText(
      /Earth Polychromatic Imaging Camera/i
    );
    expect(imageText).toBeInTheDocument();
  });

  it("checks if Footer renders with correct text", () => {
    customRender(<App />);
    expect(screen.getByText(/Akanksha Kori/i)).toBeInTheDocument();
  });

  it("allows toggling Facts visibility", () => {
    customRender(<App />);
    const toggleButton = screen.getByText(/Hide Facts/i);
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Show Facts");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Hide Facts");
  });

  //UsernameModal.js
  describe("UsernameModal", () => {
    it("displays error message with invalid input", async () => {
      render(
        <UsernameModal
          showModal={true}
          setShowModal={() => {}}
          setUserName={() => {}}
        />
      );
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "invalid_input" },
      });
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
      const errorMessage = await screen.findByText(
        /Please enter a valid alphanumeric name or email address./i
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("submits with valid input", () => {
      const setUserName = jest.fn();
      render(
        <UsernameModal
          showModal={true}
          setShowModal={() => {}}
          setUserName={setUserName}
        />
      );
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "validInput" },
      });
      fireEvent.click(screen.getByText(/submit/i));
      expect(setUserName).toHaveBeenCalledWith("validInput");
    });
  });

  // APOD..js
  describe("APOD", () => {
    it("handles date change and fetches new APOD", async () => {
      const mockApodData = {
        data: {
          title: "Galaxy in Space",
          url: "http://example.com/galaxy.jpg",
          explanation: "A beautiful view of a galaxy.",
        },
      };
      axios.get.mockResolvedValue(mockApodData);
      render(<APOD />);
      expect(
        await screen.findByText(/Astronomy Picture of the Day/i)
      ).toBeInTheDocument();
      const dateInput = await screen.findByLabelText(/select a date/i);
      fireEvent.change(dateInput, { target: { value: "2023-02-21" } });
      const title = await screen.findByText(/Galaxy in Space/i);
      const description = await screen.findByText(
        /A beautiful view of a galaxy./i
      );
      const image = screen.getByRole("img", { name: /Galaxy in Space/i });
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "http://example.com/galaxy.jpg");
    });
  });

  //Similarly can have two more describe for testing Mars-rover & EPIC
});
