export type ControllerReturn<T = unknown> =
  | { message: string; data: T }
  | { message: string; data?: T }; // `data` est optionnel ici
