import React from "react";
import { storiesOf } from "@storybook/react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AuContextProvider from "../src/contexts/authContext";
import { MemoryRouter } from "react-router";
import SiteHeader from "../src/components/siteHeader";
import Card from "../src/components/card";
import CardList from "../src/components/SHOP/CardList";


storiesOf("Home Page/Card", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Card    />
  ))

storiesOf("Home Page/header", module)
.addDecorator(story => (
  <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
))
.add("default",()=>(
  <AuContextProvider><SiteHeader/></AuContextProvider>
))
.add("default",()=>(
  <CardList/>
))


