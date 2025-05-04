import { Lecturer } from "../../components/types";

interface LecturersState {
  lecturers: Lecturer[];
  error: string;
  loading: boolean;
}

export enum LecturersActionTypes {
  FETCH = "fetch",
  SUCCESS = "success",
  FAIL = "fail",
  DELETE = "delete",
  ADD_LECTURER = "addLecturer",
  EDIT_LECTURER = "editLecturer",
}

export type LecturersAction =
  | { type: LecturersActionTypes.FETCH }
  | { type: LecturersActionTypes.SUCCESS; payload: Lecturer[] }
  | { type: LecturersActionTypes.FAIL; payload: string }
  | { type: LecturersActionTypes.DELETE; payload: string }
  | { type: LecturersActionTypes.ADD_LECTURER; payload: Lecturer }
  | { type: LecturersActionTypes.EDIT_LECTURER; payload: Lecturer };

export const LecturersInitialState: LecturersState = {
  error: "",
  loading: false,
  lecturers: [],
};

export const LecturersReducer = (
  state: LecturersState,
  action: LecturersAction
): LecturersState => {
  switch (action.type) {
    case LecturersActionTypes.FETCH:
      return { ...state, loading: true };
    case LecturersActionTypes.SUCCESS:
      return { ...state, loading: false, lecturers: action.payload };
    case LecturersActionTypes.FAIL:
      return { ...state, loading: false, error: action.payload };
    case LecturersActionTypes.DELETE:
      return {
        ...state,
        lecturers: state.lecturers.filter(
          (lecturer) => lecturer._id !== action.payload.toString()
        ),
      };
    case LecturersActionTypes.ADD_LECTURER:
      return {
        ...state,
        lecturers: [...state.lecturers, action.payload],
      };
    case LecturersActionTypes.EDIT_LECTURER:
      return {
        ...state,
        lecturers: state.lecturers.map((lecturer) =>
          lecturer._id === action.payload._id ? action.payload : lecturer
        ),
      };
    default:
      return state;
  }
};
