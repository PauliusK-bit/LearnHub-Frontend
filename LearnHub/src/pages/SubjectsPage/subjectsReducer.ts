import { Subject } from "../../components/types";

interface SubjectsState {
  subjects: Subject[];
  error: string;
  loading: boolean;
}

export enum SubjectsActionTypes {
  FETCH = "fetch",
  SUCCESS = "success",
  FAIL = "fail",
  DELETE = "delete",
  ADD_SUBJECT = "addSubject",
  EDIT_SUBJECT = "editSubject",
}

export type SubjectsAction =
  | { type: SubjectsActionTypes.FETCH }
  | { type: SubjectsActionTypes.SUCCESS; payload: Subject[] }
  | { type: SubjectsActionTypes.FAIL; payload: string }
  | { type: SubjectsActionTypes.DELETE; payload: string }
  | { type: SubjectsActionTypes.ADD_SUBJECT; payload: Subject }
  | { type: SubjectsActionTypes.EDIT_SUBJECT; payload: Subject };

export const SubjectsInitialState: SubjectsState = {
  error: "",
  loading: false,
  subjects: [],
};

export const SubjectsReducer = (
  state: SubjectsState,
  action: SubjectsAction
): SubjectsState => {
  switch (action.type) {
    case SubjectsActionTypes.FETCH:
      return { ...state, loading: true };
    case SubjectsActionTypes.SUCCESS:
      return { ...state, loading: false, subjects: action.payload };
    case SubjectsActionTypes.FAIL:
      return { ...state, loading: false, error: action.payload };
    case SubjectsActionTypes.DELETE:
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject.id !== action.payload.toString()
        ),
      };
    case SubjectsActionTypes.ADD_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, action.payload],
      };
    case SubjectsActionTypes.EDIT_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map((subjcet) =>
          subjcet.id === action.payload.id ? action.payload : subjcet
        ),
      };
    default:
      return state;
  }
};
