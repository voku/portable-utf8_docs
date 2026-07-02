export interface LibraryStats {
  downloads: number;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  version: string;
}

export interface CodeExample {
  id: string;
  name: string;
  method: string;
  input: string;
  description: string;
  phpCode: string;
  nativePhpCode: string;
  nativeOutput: string | number;
  portableOutput: string | number;
  explanation: string;
}

export interface ApiMethod {
  name: string;
  signature: string;
  description: string;
  category: 'clean' | 'measure' | 'transform' | 'inspect';
  example: string;
}
