import { createContext, ReactNode, useContext, useReducer } from "react";
import { Subject } from "../../components/types";
import {
  SubjectsActionTypes,
  SubjectsInitialState,
  SubjectsReducer,
} from "./subjectsReducer";
import axios from "axios";
import { API_URL } from "../../config/config";

interface SubjectsContextType {
  subjects: Subject[];
  loading: boolean;
  error: string;
  fetchSubjects: () => Promise<void>;
  addSubject: (subject: Subject) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  editSubject: (subject: Subject) => Promise<void>;
}

export const SubjectsContext = createContext<SubjectsContextType | undefined>(
  undefined
);

export const SubjectsPageContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(SubjectsReducer, SubjectsInitialState);

  const { subjects, loading, error } = state;

  const fetchSubjects = async () => {
    try {
      dispatch({ type: SubjectsActionTypes.FETCH });
      const { data } = await axios(`${API_URL}/subjects`);
      dispatch({ type: SubjectsActionTypes.SUCCESS, payload: data });
    } catch {
      dispatch({
        type: SubjectsActionTypes.FAIL,
        payload: "Failed to fetch subjects",
      });
    }
  };

  const addSubject = async (newSubject: Subject) => {
    try {
      dispatch({ type: SubjectsActionTypes.FETCH });
      const { data } = await axios.post(`${API_URL}/subjects`, newSubject);
      dispatch({ type: SubjectsActionTypes.ADD_SUBJECT, payload: data });
    } catch {
      dispatch({
        type: SubjectsActionTypes.FAIL,
        payload: "Failed to add subject",
      });
    }
  };

  const deleteSubject = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/subjects/${id}`);
      dispatch({ type: SubjectsActionTypes.DELETE, payload: id });
    } catch {
      dispatch({
        type: SubjectsActionTypes.FAIL,
        payload: "Failed to delete subject",
      });
    }
  };

  const editSubject = async (subject: Subject) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/subjects/${subject.id}`,
        subject
      );
      dispatch({ type: SubjectsActionTypes.EDIT_SUBJECT, payload: data });
    } catch {
      dispatch({
        type: SubjectsActionTypes.FAIL,
        payload: "Failed to edit event",
      });
    }
  };

  const ctxValue: SubjectsContextType = {
    loading,
    error,
    subjects,
    fetchSubjects,
    addSubject,
    deleteSubject,
    editSubject,
  };

  return (
    <SubjectsContext.Provider value={ctxValue}>
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => {
  const ctx = useContext(SubjectsContext);
  if (!ctx) {
    throw new Error(
      "useSubjects cannot be used outside the SubjectsPageContextProvider"
    );
  }

  return ctx;
};
