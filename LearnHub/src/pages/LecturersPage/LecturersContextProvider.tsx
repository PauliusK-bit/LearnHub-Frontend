import { createContext, ReactNode, useContext, useReducer } from "react";
import { Lecturer } from "../../components/types";
import {
  LecturersActionTypes,
  LecturersInitialState,
  LecturersReducer,
} from "./lecturersReducer";
import axios from "axios";
import { API_URL } from "../../config/config";

interface LecturersContextType {
  lecturers: Lecturer[];
  loading: boolean;
  error: string;
  fetchLecturers: () => Promise<void>;
  addLecturer: (lecturer: Lecturer) => Promise<void>;
  deleteLecturer: (id: string) => Promise<void>;
  editLecturer: (lecturer: Lecturer) => Promise<void>;
}

export const LecturersContext = createContext<LecturersContextType | undefined>(
  undefined
);

export const LecturersPageContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(LecturersReducer, LecturersInitialState);

  const { lecturers, loading, error } = state;

  const fetchLecturers = async () => {
    try {
      dispatch({ type: LecturersActionTypes.FETCH });
      const { data } = await axios(`${API_URL}/lecturers`);
      dispatch({ type: LecturersActionTypes.SUCCESS, payload: data });
    } catch {
      dispatch({
        type: LecturersActionTypes.FAIL,
        payload: "Failed to fetch lecturers",
      });
    }
  };

  const addLecturer = async (newLecturer: Lecturer) => {
    try {
      dispatch({ type: LecturersActionTypes.FETCH });
      const { data } = await axios.post(`${API_URL}/lecturers`, newLecturer);
      dispatch({ type: LecturersActionTypes.ADD_LECTURER, payload: data });
    } catch {
      dispatch({
        type: LecturersActionTypes.FAIL,
        payload: "Failed to add lecturer",
      });
    }
  };

  const deleteLecturer = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/lecturers/${id}`);
      dispatch({ type: LecturersActionTypes.DELETE, payload: id });
    } catch {
      dispatch({
        type: LecturersActionTypes.FAIL,
        payload: "Failed to delete lecturer",
      });
    }
  };

  const editLecturer = async (lecturer: Lecturer) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/lecturers/${lecturer._id}`,
        lecturer
      );

      dispatch({ type: LecturersActionTypes.EDIT_LECTURER, payload: data });
    } catch {
      dispatch({
        type: LecturersActionTypes.FAIL,
        payload: "Failed to edit lecturer",
      });
    }
  };

  const ctxValue: LecturersContextType = {
    loading,
    error,
    lecturers,
    fetchLecturers,
    addLecturer,
    deleteLecturer,
    editLecturer,
  };

  return (
    <LecturersContext.Provider value={ctxValue}>
      {children}
    </LecturersContext.Provider>
  );
};

export const useLecturers = () => {
  const ctx = useContext(LecturersContext);
  if (!ctx) {
    throw new Error(
      "useLecturers cannot be used outside the LecturersPageContextProvider"
    );
  }

  return ctx;
};
