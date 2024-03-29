import {
  Navigate,
  Outlet,
  useRoutes,
  type RouteObject
} from 'react-router-dom';
import path from './constants/path';
import { useAppContext } from './contexts/app.contexts';
import MainLayout from './layouts/MainLayout';
import ConductPointsManagement from './pages/ConductPointsManagement/ConductPointsManagement';
import AddCourseForm from './pages/CourseManagement/AddCourseForm';
import CourseManagement from './pages/CourseManagement/CourseManagement';
import Dashboard from './pages/Dashboard/Dashboard';
import ExamScheduleManagement from './pages/ExamScheduleManagement/ExamScheduleManagement';
import AddFee from './pages/Fee/AddFee';
import FeeList from './pages/Fee/FeeList';
import FileManagement from './pages/FileManagement/FileManagement';
import AddLecturer from './pages/Lecturer/AddLecturerForm';
import AllLecturer from './pages/Lecturer/AllLecturer';
import Login from './pages/Login';
import RewardManagement from './pages/RewardManagement/RewardManagement';
import ScheduleManagement from './pages/ScheduleManagement/ScheduleManagement';
import ScheduleTable from './pages/ScheduleTable/ScheduleTable';
import AddStudentForm from './pages/Student/AddStudentForm';
import AllStudent from './pages/Student/AllStudent';
import StudentConductPoints from './pages/StudentConductPoints/StudentConductPoints';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentFeeInfo from './pages/StudentFeeInfo/StudentFeeInfo';
import AddFileForm from './pages/StudentFileManagement/AddFileForm';
import StudentFileManagement from './pages/StudentFileManagement/StudentFileManagement';
import StudentRewardManagement from './pages/StudentRewardManagement/StudentRewardManagement';
import StudentTestSchedule from './pages/StudentTestSchedule/StudentTestSchedule';
import StudentTranscriptInput from './pages/StudentTranscriptInput/StudentTranscriptInput';
import Transcript from './pages/Transcript/Transcript';
import CoursesRegistered from './pages/UserCourseManagement/CoursesRegistered/CoursesRegistered';
import CoursesRegistration from './pages/UserCourseManagement/CoursesRegistration/CoursesRegistration';
import { getProfileFromLS } from './utils/auth';
function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const AuthRouteChildren: RouteObject[] = [
  {
    path: path.login,
    element: <Login userRole={'sv'} />
  },
  {
    path: path.admin_login,
    element: <Login userRole={'nv'} />
  }
];

function AdminRoute(adminElement: JSX.Element, studentElement: JSX.Element) {
  const isAdmin = getProfileFromLS()?.role === 'nv';
  return isAdmin ? adminElement : studentElement;
}

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      element: <RejectedRoute />,
      children: AuthRouteChildren
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              element: AdminRoute(<Dashboard />, <StudentDashboard />),
              path: path.dashboard
            },
            {
              element: <AllStudent />,
              path: path.all_students
            },
            {
              element: <RewardManagement />,
              path: path.reward_management
            },
            {
              element: <StudentFileManagement />,
              path: path.student_file_management
            },
            {
              element: <StudentRewardManagement />,
              path: path.student_reward_management
            },
            {
              element: <StudentTranscriptInput />,
              path: path.student_result_management
            },
            {
              element: <AddFileForm />,
              path: path.add_student_file_form
            },
            {
              element: <AddStudentForm />,
              path: path.add_student
            },
            {
              path: path.all_lecturers,
              element: <AllLecturer />
            },
            {
              path: path.add_lecturer,
              element: <AddLecturer />
            },
            {
              path: path.fee_list,
              element: <FeeList />
            },
            {
              path: path.add_fee,
              element: <AddFee />
            },
            {
              path: path.course_management,
              element: <CourseManagement />
            },
            {
              path: path.file_management,
              element: <FileManagement />
            },
            {
              path: path.conduct_points_management,
              element: <ConductPointsManagement />
            },
            {
              path: path.add_course_form,
              element: <AddCourseForm />
            },
            {
              path: path.exam_schedule_management,
              element: <ExamScheduleManagement />
            },
            {
              path: path.student_transcript,
              element: <Transcript />
            },
            {
              path: path.student_fee_info,
              element: <StudentFeeInfo />
            },
            {
              path: path.student_conduct_points,
              element: <StudentConductPoints />
            },
            {
              path: path.student_test_schedule,
              element: <StudentTestSchedule />
            },
            {
              path: path.all,
              element: AdminRoute(
                <Navigate to={path.all_students} />,
                <Navigate to={path.dashboard} />
              )
            },
            {
              path: path.course_registration,
              element: <CoursesRegistration />
            },
            {
              path: path.course_registered,
              element: <CoursesRegistered />
            },
            {
              path: path.student_schedule,
              element: <ScheduleTable />
            },
            {
              path: path.timetable_management,
              element: <ScheduleManagement />
            }
          ]
        },
        {
          path: path.print_transcript,
          element: <Transcript isPrint={true} />
        }
      ]
    }
  ]);

  return routeElement;
}
