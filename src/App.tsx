import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "./theme";

export default function App() {
  return <MantineProvider theme={theme}>Kamel</MantineProvider>;
}
