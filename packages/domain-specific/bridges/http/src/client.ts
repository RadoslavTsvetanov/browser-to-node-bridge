import { treaty } from "@elysiajs/eden"
import app from "./server/definition"

export const client = treaty<typeof app>('localhost:3000')
client.routes.fs.readFile.post


// let app: Elysia<"", {
//     decorator: {};
//     store: {};
//     derive: {};
//     resolve: {};
// }, {
//     typebox: {};
//     error: {};
// }, {
//     schema: {};
//     standaloneSchema: {};
//     macro: {};
//     macroFn: {};
//     parser: {};
// }, {
//     api: {
//         healthcheck: {
//             post: {
//                 body: unknown;
//                 params: {};
//                 query: unknown;
//                 headers: unknown;
//                 response: {
//                     ...;
//                 } | ... 1 more ... | {
//                     ...;
//                 };
//             };
//         };
//     };
// }, {
//     ...;
// }, {
//     ...;
// }>
