export interface RequestState {
  isActive: boolean;
  hasErrored: boolean;
  errorMessage: string;
}

export const defaultRequestState = {
  isActive: false,
  hasErrored: false,
  errorMessage: "",
};
