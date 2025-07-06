import type { Bridge } from "@blazyts/browser-to-node-bridge";
import { RemoteServerBridge } from "@blazyts/server-proxy-implementation";

export const bridge: Bridge = (new RemoteServerBridge())