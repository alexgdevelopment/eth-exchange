const getConfigNetworkName = () =>
  process.env.REACT_APP_NETWORK_NAME || "Ethereum";
export default getConfigNetworkName;
