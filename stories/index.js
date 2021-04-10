import React from "react";
import { storiesOf } from "@storybook/react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { MemoryRouter } from "react-router";
import NewspaperPage from "../src/pages/NewsPaperPage"


storiesOf("Home Page/news", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <NewspaperPage />
  ))




