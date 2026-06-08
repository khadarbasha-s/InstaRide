declare module "bcryptjs" {
  export function hash(s: string, saltRounds: number): Promise<string>;
  export function hashSync(s: string, saltRounds: number): string;
  export function compare(s: string, hash: string): Promise<boolean>;
  export function compareSync(s: string, hash: string): boolean;
  export function genSalt(rounds?: number): Promise<string>;
  const _default: {
    hash: typeof hash;
    hashSync: typeof hashSync;
    compare: typeof compare;
    compareSync: typeof compareSync;
    genSalt: typeof genSalt;
  };
  export default _default;
}
