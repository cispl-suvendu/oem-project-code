"use client"
import React from 'react';
import useFetchData from "../../hooks/useFetch";
import ExamService from '../../services/examsServices';

export default function Page() {
  const examService = new ExamService()
  const { data: exam, loading, refetch :examRefetch} = useFetchData(
    examService.fetchAllExams,
    { active: 1, limit:2 },
    (result) => result
  );


  return (
    <main>
      <h2>Cat</h2>
      {loading ? <p>Loading...</p> : <div>Data: {JSON.stringify(exam)}</div>}
    </main>
  );
}
