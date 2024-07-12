import { AppFeature } from "./app-feature.enum";
import { UserType } from "./user-type";

export interface YapiToken {
  token: string;
  type: UserType;
  data: YapiTokenData;
  test?: boolean;
  disabledFeatures?: AppFeature[];
}

export interface YapiTokenData {
  _id: string;
  uid?: string;
  Nom: string;
  Prenom: string;
  timezone?: string;
  type?: UserType;
}
