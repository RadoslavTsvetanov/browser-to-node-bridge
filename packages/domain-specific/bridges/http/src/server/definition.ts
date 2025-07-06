



import { objectEntries } from "@blazyts/better-standard-library";
import type { Bridge } from "../../../../core";
import { RemoteServerBridge } from "@blazyts/server-proxy-implementation";
import { treaty } from "@elysiajs/eden";
import swagger from "@elysiajs/swagger";
import Elysia, { t, type DefinitionBase, type MetadataBase, type RouteBase, type SingletonBase } from "elysia";
import { client } from "../client";

let app = new Elysia()  // scrape it for now use your own lib when you are done 
.use(new Elysia({prefix: "/api"}).post("/healthcheck", () => { return {"kur": ""}}, {
    body: t.Object({
        kur: t.String()
    }),
    response: t.Object({
        kur: t.String()
    })
}));




const remoteBridge = new RemoteServerBridge();

// objectEntries(remoteBridge).forEach(([moduleName, module]) => {
//     const subRouter = new Elysia({ prefix: `/${moduleName}` });

//     objectEntries(module).forEach(([methodName, method]) => {
//         if (typeof method === 'function') {
//             subRouter.post(`/${methodName}`, async ({ body }) => {
//                 // Assume body is an array of args
//                 return await method(...(body as unknown[]));
//             });
//         }
//     });

//     app = app.use(subRouter);
// });





function registerBridgeRoutes<
    Bridge extends RemoteServerBridge,
    App extends Elysia<any>
>(
    app: App,
    bridge: Bridge
)
// : Elysia<"",SingletonBase , DefinitionBase , MetadataBase, {
//     routes: {
//         [Module in keyof Bridge]: {
//             [Method in keyof Bridge[Module]]: {
//                 post: {
//                     body: Bridge[Module][Method] extends (...args: infer Args) => any ? Args : never;
//                     response: {
//                         200: {
//                             data: ReturnType<Bridge[Module][Method]> extends Promise<infer R> ? Promise<R> : never
//                         }
//                     };
//                 }
//             }
//         } 
//     }
// }
// >
 {
    return objectEntries(bridge).reduce((currentApp, [moduleName, module]) => {
        const subRouter = new Elysia({ prefix: `/${moduleName.toString()}` });
        
        objectEntries(module).forEach(([methodName, method]) => {
            if (typeof method === "function") {
                subRouter.post(`/${methodName}`, async ({ body }) => {
                    return await method(...(body.arguments as unknown[]));
                });
            }
        });

        return currentApp.use(subRouter);
    }, app);
}
const modifiedApp = registerBridgeRoutes(app, remoteBridge);

export default modifiedApp;

