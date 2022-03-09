export interface IAuthStore {
  name: string | null;
  signIn: (name: string) => void;
  signOut: () => void;
}
