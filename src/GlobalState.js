import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
// import FilterAPI from './api/FilterAPI';

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
  const [allReport, setAllReport] = useState([]);
  const [allCommon, setAllCommon] = useState([]);
  const [department, setDepartment] = useState([]);
  const [pagination, setPagination] = useState({page: 1});
  const [isFilter, setIsFilter] = useState(false);

  useEffect(async () => {
    const departResult = await axios.post(
      'https://qlsc.maysoft.io/server/api/getAllDepartments',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY',
        },
      },
    );
    let departmentGroups = departResult.data.data.data;

    const commonResult = await axios.post(
      'https://qlsc.maysoft.io/server/api/getCommon',
      {
        groups: 'incidentObject, reportStatus, reportType',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY',
        },
      },
    );
    let commonGroup = commonResult.data.data;
    const reportResult = await axios.post(
      'https://qlsc.maysoft.io/server/api/getAllReports',

      pagination,

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY',
        },
      },
    );
    let reportList = reportResult.data.data.data;

    reportList = reportList.map(report => {
      const incidentObject = commonGroup?.incidentObject?.find(
        item => item.code === report.incidentObject,
      );
      const reportStatus = commonGroup?.reportStatus?.find(
        item => item.code === report.status,
      );
      const reportType = commonGroup?.reportType?.find(
        item => item.code === report.reportType,
      );
      return {
        ...report,
        incidentObjectName: incidentObject?.name,
        statusName: reportStatus?.name,
        reportTypeName: reportType?.name,
      };
    });

    // console.log({reportList});

    setAllReport(reportList);
    setAllCommon(commonGroup);
    setDepartment(departmentGroups);
    setIsFilter(false);
  }, [pagination]);
  // console.log(department);
  // console.log(allReport);

  const state = {
    allReport: allReport,
    allCommon: allCommon,
    pagination: pagination,
    department: department,
    setPagination: setPagination,
    isFilter: isFilter,
    setIsFilter: setIsFilter,
    // totalPage: totalPage,
    // allCommons: allCommons,
    // departmentId: departmentId,
    // setDepartmentId: setDepartmentId,
    // filterAPI: FilterAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
