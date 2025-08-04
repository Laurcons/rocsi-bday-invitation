export enum PresenceStatus {
  ATTENDING = "attending",
  NOT_ATTENDING = "not-attending",
}

export interface EventData {
  date: string;
  presenceStatus?: PresenceStatus;
}
