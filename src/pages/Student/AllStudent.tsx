import {
  Button,
  Dropdown,
  FloatingLabel,
  Select,
  TextInput
} from 'flowbite-react';
import Pagination from 'src/components/Pagination';

import { useState } from 'react';
import Table from 'src/components/Table';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from 'src/apis/student.api';
const AllStudent = () => {
  const courseMajor = ['KTPM', 'KHMT', 'ATTT', 'MMT&TT'];
  // const headers = [
  //   { title: 'Mã số sinh viên', dataIndex: 'studentID' },
  //   { title: 'Tên', dataIndex: 'studentName' },
  //   { title: 'Giới tính', dataIndex: 'gender' },
  //   { title: 'Lớp', dataIndex: 'class' },
  //   { title: 'Trạng thái học tập', dataIndex: 'status' },
  //   { title: 'Email', dataIndex: 'email' },
  //   { title: 'Ngày sinh', dataIndex: 'dateOfBirth' }
  // ];
  const data = [
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    },
    {
      studentID: '21520620',
      studentName: 'Nguyễn Tuấn Bảo',
      gender: 'Nam',
      class: 'KTPM',
      status: 'Đang học',
      email: '21520620@gm.uit.edu.vn',
      dateOfBirth: '11/03/2003'
    }
  ];

  const [pageSize, setPageSize] = useState<number>(5);
  const [search, setSearchVal] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('ID');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSelectedValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
  };

  const { data: studentData, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: ({ signal }) => studentApi.getAllStudents(0, 20, signal)
  });

  const headers = [
    { title: 'Mã sinh viên', dataIndex: 'maSinhVien' },
    { title: 'Họ tên sinh viên', dataIndex: 'hoTenSinhVien' },
    { title: 'Mã khóa học', dataIndex: 'maKhoaHoc' },
    { title: 'Mã chuyên ngành', dataIndex: 'maChuyenNganh' },
    { title: 'Mã hệ đào tạo', dataIndex: 'maHeDaoTao' },
    { title: 'Tình trạng học tập', dataIndex: 'tinhTrangHocTap' },
    { title: 'Ngày sinh', dataIndex: 'ngaySinh' },
    { title: 'Giới tính', dataIndex: 'gioiTinh' }
  ];
  // console.log(studentData) to test the data load successfully 
  const students = studentData?.data.result;
  
  
  return (
    <div id='student-table-container' className='w-full bg-white p-5 shadow-lg'>
      <div id='input-row' className='flex items-center'>
        <div className='w-96'>
          <TextInput
            placeholder='Tìm kiếm...'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className='ml-4'>
          <Select
            id='filter'
            value={selectedValue}
            onChange={handleSelectedValueChange}
            required
          >
            {headers.map(header => {
              return (
                <option key={header.dataIndex} value={header.dataIndex}>
                  {header.title}
                </option>
              );
            })}
          </Select>
        </div>
        <div className='ml-auto flex items-center'>
          <span className='mr-2 text-gray-500'>Hiển thị</span>
          <Select
            id='pageSize'
            value={pageSize}
            onChange={e => setPageSize(+e.target.value)}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </Select>
          <span className='ml-2 text-gray-500'>kết quả</span>
        </div>
      </div>
      {!isLoading && students && (
        <Table
          headers={headers}
          data={students}
          className='border-input mt-2 border-2'
          filters={{ [selectedValue]: search }}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default AllStudent;
function setCurrentPage(page: number) {
  throw new Error('Function not implemented.');
}
