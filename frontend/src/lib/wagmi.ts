import { http, createConfig } from "wagmi";
import { linea, lineaSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  ssr: true,
  chains: [linea, lineaSepolia],
  connectors: [metaMask()],
  transports: {
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
});