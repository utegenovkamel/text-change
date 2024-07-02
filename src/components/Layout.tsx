import { AppShell, MantineProvider } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { theme } from "../theme.ts";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: "sm",
        }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};
