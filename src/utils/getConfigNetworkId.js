const getConfigNetworkId = () =>
  parseInt(process.env.REACT_APP_NETWORK_ID) || 1;
export default getConfigNetworkId;
