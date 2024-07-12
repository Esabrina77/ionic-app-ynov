import { AppFeature } from "./app-feature.enum";
import { UserType } from "./user-type";

export interface GetTokenResponse {
  token: string;
  type: UserType;
  test?: boolean;
  disabledFeatures?: AppFeature[];
}
