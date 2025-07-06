export type Module<T extends Record<string, any>> = T 


export interface Bridge {
    fs: Module<{
        readFile: (path: string) => Promise<string>;
        writeFile: (path: string, data: string) => Promise<void>;

    }>,
    path : Module<{
        join: (...paths: string[]) => string;
        dirname: (path: string) => string;
        basename: (path: string) => string;
    }>
    process: Module<{
        cwd: () => string;
        env: {
            [key: string]: string | undefined
        }
    }>
}



export function viteAdapter(v: Bridge): Bridge { // it is made so that the user is forced to provide an implementation of the bridge otherwise he can forgot to implement some methods and the alias in vite config will still accpet however with this he will get an error at compile time
    
    return v
}

export function webpackAdapter(v: Bridge): Bridge { // it is made so that the user is forced to provide an implementation of the bridge otherwise he can forgot to implement some methods and the alias in webpack config will still accpet however with this he will get an error at compile time
    
    return v
}

