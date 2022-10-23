import { useEffect } from "react";
import { useDispatch } from "react-redux";
import WalletCard from "./components/WalletCard";
import { init } from "./store/settingsSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);
  return (
    <div>
      <WalletCard />
    </div>
  );
}

export default App;
