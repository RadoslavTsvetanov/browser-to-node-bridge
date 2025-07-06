import type { Bridge } from "@blazyts/browser-to-node-bridge";
import {promises} from "fs"

export class RemoteServerBridge implements Bridge {


    fs = {
        readFile: (path: string) => promises.readFile(path, "utf-8"),
        writeFile: (path: string, data: string) => promises.writeFile(path, data, "utf-8"),
    };  

}