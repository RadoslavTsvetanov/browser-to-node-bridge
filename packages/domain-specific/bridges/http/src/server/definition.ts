



// import { objectEntries } from "@blazyts/better-standard-library";
// import type { Bridge } from "../../../../core";
// import { RemoteServerBridge } from "@blazyts/server-proxy-implementation";
// import { treaty } from "@elysiajs/eden";
import swagger from "@elysiajs/swagger";
// import Elysia, { t, type DefinitionBase, type MetadataBase, type RouteBase, type SingletonBase } from "elysia";
// import { client } from "../client";

// let app = new Elysia()  // scrape it for now use your own lib when you are done 
// .use(new Elysia({prefix: "/api"}).post("/healthcheck", () => { return {"kur": ""}}, {
//     body: t.Object({
//         kur: t.String()
//     }),
//     response: t.Object({
//         kur: t.String()
//     })
// }));




// const remoteBridge = new RemoteServerBridge();

// // objectEntries(remoteBridge).forEach(([moduleName, module]) => {
// //     const subRouter = new Elysia({ prefix: `/${moduleName}` });

// //     objectEntries(module).forEach(([methodName, method]) => {
// //         if (typeof method === 'function') {
// //             subRouter.post(`/${methodName}`, async ({ body }) => {
// //                 // Assume body is an array of args
// //                 return await method(...(body as unknown[]));
// //             });
// //         }
// //     });

// //     app = app.use(subRouter);
// // });





// function registerBridgeRoutes<
//     Bridge extends RemoteServerBridge,
//     App extends Elysia<any>
// >(
//     app: App,
//     bridge: Bridge
// )
// // : Elysia<"",SingletonBase , DefinitionBase , MetadataBase, {
// //     routes: {
// //         [Module in keyof Bridge]: {
// //             [Method in keyof Bridge[Module]]: {
// //                 post: {
// //                     body: Bridge[Module][Method] extends (...args: infer Args) => any ? Args : never;
// //                     response: {
// //                         200: {
// //                             data: ReturnType<Bridge[Module][Method]> extends Promise<infer R> ? Promise<R> : never
// //                         }
// //                     };
// //                 }
// //             }
// //         } 
// //     }
// // }
// // >
//  {
//     return objectEntries(bridge).reduce((currentApp, [moduleName, module]) => {
//         const subRouter = new Elysia({ prefix: `/${moduleName.toString()}` });
        
//         objectEntries(module).forEach(([methodName, method]) => {
//             if (typeof method === "function") {
//                 subRouter.post(`/${methodName}`, async ({ body }) => {
//                     return await method(...(body.arguments as unknown[]));
//                 });
//             }
//         });

//         return currentApp.use(subRouter);
//     }, app);
// }
// const modifiedApp = registerBridgeRoutes(app, remoteBridge);

// export default modifiedApp;


import { Elysia, t } from 'elysia'
import { promises as fs } from 'fs'
import { join } from 'path'

// Create fs subapp
const fsApp = new Elysia({ prefix: '/fs' })
  .post('/readdir', async ({ body }) => {
    try {
      const { path = '.' } = body as { path?: string }
      const files = await fs.readdir(path)
      return {
        success: true,
        data: files,
        path
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        code: (error as NodeJS.ErrnoException)?.code
      }
    }
  }, {
    body: t.Object({
      path: t.Optional(t.String({ description: 'Directory path to read', default: '.' }))
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
        data: t.Optional(t.Array(t.String())),
        path: t.Optional(t.String()),
        error: t.Optional(t.String()),
        code: t.Optional(t.String())
      })
    },
    detail: {
      summary: 'Read directory contents',
      description: 'Lists all files and directories in the specified path',
      tags: ['fs']
    }
  })
  
  .post('/writeFile', async ({ body }) => {
    try {
      const { path, data, encoding = 'utf8' } = body as {
        path: string
        data: string
        encoding?: BufferEncoding
      }
      
      if (!path || data === undefined) {
        return {
          success: false,
          error: 'Path and data are required'
        }
      }
      
      await fs.writeFile(path, data, encoding)
      return {
        success: true,
        message: `File written successfully to ${path}`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        code: (error as NodeJS.ErrnoException)?.code
      }
    }
  }, {
    body: t.Object({
      path: t.String({ description: 'File path to write to' }),
      data: t.String({ description: 'Data to write to the file' }),
      encoding: t.Optional(t.String({ 
        description: 'File encoding', 
        default: 'utf8',
        enum: ['utf8', 'ascii', 'base64', 'binary', 'hex', 'latin1', 'utf16le', 'ucs2']
      }))
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
        message: t.Optional(t.String()),
        error: t.Optional(t.String()),
        code: t.Optional(t.String())
      })
    },
    detail: {
      summary: 'Write file',
      description: 'Writes data to a file at the specified path',
      tags: ['fs']
    }
  })
  
  .post('/readFile', async ({ body }) => {
    try {
      const { path, encoding = 'utf8' } = body as {
        path?: string
        encoding?: BufferEncoding
      }
      
      if (!path) {
        return {
          success: false,
          error: 'Path is required'
        }
      }
      
      const data = await fs.readFile(path, encoding)
      return {
        success: true,
        data,
        path,
        encoding
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        code: (error as NodeJS.ErrnoException)?.code
      }
    }
  }, {
    body: t.Object({
      path: t.String({ description: 'File path to read from' }),
      encoding: t.Optional(t.String({ 
        description: 'File encoding', 
        default: 'utf8',
        enum: ['utf8', 'ascii', 'base64', 'binary', 'hex', 'latin1', 'utf16le', 'ucs2']
      }))
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
        data: t.Optional(t.String()),
        path: t.Optional(t.String()),
        encoding: t.Optional(t.String()),
        error: t.Optional(t.String()),
        code: t.Optional(t.String())
      })
    },
    detail: {
      summary: 'Read file',
      description: 'Reads the contents of a file at the specified path',
      tags: ['fs']
    }
  })

// Main app
const app = new Elysia()
  .get('/', () => ({
    message: 'Node.js Standard Library API',
    version: '1.0.0',
    modules: {
      fs: {
        prefix: '/fs',
        endpoints: [
          'POST /fs/readdir (body: {path?})',
          'POST /fs/writeFile (body: {path, data, encoding?})',
          'POST /fs/readFile (body: {path, encoding?})'
        ]
      }
    }
  }))
  .use(fsApp)
  .listen(3000)

console.log(`🦊 Elysia Node.js Standard Library API running at ${app.server?.hostname}:${app.server?.port}`)

export default app