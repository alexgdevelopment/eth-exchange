import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import WalletCard from "./components/WalletCard";
import Rates from "./components/Rates";
import { init } from "./store/settingsSlice";
import Section from "./components/Section";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);
  return (
    <Stack spacing={2} alignItems="center">
      <Section>
        <Rates />
      </Section>
      <Section>
        <WalletCard />
      </Section>
    </Stack>
  );
}

export default App;
