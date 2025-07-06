// ./src/kook.ts
export const readFile = async (path: string): Promise<string> => {
  throw new Error(`readFile not supported in the browser (path: ${path}), huhu`);
};

export const writeFile = async (path: string, _data: string): Promise<void> => {
  throw new Error(`writeFile not supported in the browser (path: ${path})`);
};


