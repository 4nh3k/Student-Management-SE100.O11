import { useQuery } from '@tanstack/react-query';
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { studentApi } from 'src/apis/student.api';
import demoPicture from 'src/assets/imgs/ganyu.jpg';
import LoadingIndicator from 'src/components/LoadingIndicator';
import useStudent from 'src/hooks/useStudent';
import CreateStudentDto from 'src/types/create-student.dto';

interface AddStudentFormProps {
  id?: string;
}

const EditStudentForm = ({ id }: AddStudentFormProps) => {
  const [imageSrc, setImageSrc] = useState(demoPicture);
  const [file, setFile] = useState<File>();
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const decapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const [student, setStudent] = useState<CreateStudentDto>({
    hoTenSinhVien: '',
    maKhoaHoc: 1,
    maChuyenNganh: 1,
    maHeDaoTao: 5,
    tinhTrangHocTap: 'đang học',
    ngaySinh: new Date().toISOString().split('T')[0],
    gioiTinh: 'Nam',
    email: '',
    emailPassword: '',
    username: '',
    usernamePassword: '',
    soTaiKhoanNganHangDinhDanh: '',
    anhTheSinhVien: '',
    ngayNhapHoc: new Date().toISOString().split('T')[0],
    maSinhVien: 0
  });

  const { data: studentData, isLoading: isLoadingStudentData } = useQuery({
    queryKey: ['oneStudent', id],
    queryFn: ({ signal }) =>
      studentApi.getAllStudents(0, 1000, signal, parseInt(id)),
    select: data => {
      return data.data.result.map((item: CreateStudentDto) => {
        return {
          hoTenSinhVien: item.hoTenSinhVien,
          maKhoaHoc: item.maKhoaHoc,
          maChuyenNganh: item.maChuyenNganh,
          maHeDaoTao: item.maHeDaoTao,
          tinhTrangHocTap: item.tinhTrangHocTap,
          ngaySinh: item.ngaySinh,
          gioiTinh: item.gioiTinh,
          email: item.email,
          emailPassword: item.emailPassword,
          username: item.username,
          usernamePassword: item.usernamePassword,
          soTaiKhoanNganHangDinhDanh: item.soTaiKhoanNganHangDinhDanh,
          anhTheSinhVien: item.anhTheSinhVien !== '' ? item.anhTheSinhVien : '',
          ngayNhapHoc: item.ngayNhapHoc,
          maSinhVien: item.maSinhVien
        };
      });
    }
  });

  const { data: majorsData, isLoading: isMajorsLoading } = useQuery({
    queryKey: ['majors'],
    queryFn: ({ signal }) => studentApi.getAllMajors(0, 1000, signal)
  });

  const majors = majorsData?.data.result;
  const { data: facultiesData, isLoading: isFacultyLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: ({ signal }) => studentApi.getAllFaculties(0, 1000, signal)
  });

  const faculties = facultiesData?.data.result;

  const { data: educationTypes, isLoading: isEducationTypeLoading } = useQuery({
    queryKey: ['educationTypes'],
    queryFn: ({ signal }) => studentApi.getAllEducationTypes(0, 1000, signal)
  });

  const educationTypeData = educationTypes?.data.result;

  const { data: learningStatusList, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['status'],
    queryFn: ({ signal }) => studentApi.getAllLearningStatus(signal)
  });

  const learningStatuses = learningStatusList?.data.result;

  const {
    updateStudentMutation,
    deleteStudentMutation,
    createStudentImageMutation
  } = useStudent();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setStudent(prevStudent => ({ ...prevStudent, [id]: value }));
  };

  const [gender, setGender] = useState<string>('Nam');

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setStudent(prevStudent => ({ ...prevStudent, gioiTinh: e.target.value }));
  };

  const [learningStatus, setLearningStatus] = useState<string>('Đang học');

  const handleLearningStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLearningStatus(e.target.value);
    setStudent(prevStudent => ({
      ...prevStudent,
      tinhTrangHocTap: decapitalizeFirstLetter(e.target.value)
    }));
  };

  const [faculty, setFaculty] = useState<string>('Khoa học máy tính');

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = faculties.find(
      faculty => faculty.tenKhoaDaoTao === value
    );
    setFaculty(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maKhoaHoc: selectedOption.maKhoaDaoTao
    }));
  };

  const [major, setMajor] = useState<string>('Khoa học máy tính');

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = majors.find(
      major => major.tenChuyenNganh === decapitalizeFirstLetter(value)
    );
    setMajor(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maChuyenNganh: selectedOption.maChuyenNganh,
      chuyenNganh: value
    }));
  };

  const [educationType, setEducationType] = useState<string>('đại trà');

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e?.target.value;
    const selectedOption = educationTypeData.find(
      education => education.tenHeDaoTao === decapitalizeFirstLetter(value)
    );
    setEducationType(value);
    setStudent(prevStudent => ({
      ...prevStudent,
      maHeDaoTao: selectedOption.maHeDaoTao,
      heDaoTao: decapitalizeFirstLetter(value)
    }));
    console.log(student);
  };

  const handleDateOfBirthChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngaySinh: date.toISOString().split('T')[0]
    }));
  };

  const handleLearningStartDateChange = date => {
    console.log(date);
    setStudent(prevStudent => ({
      ...prevStudent,
      ngayNhapHoc: date.toISOString().split('T')[0]
    }));
  };

  useEffect(() => {
    if (
      !isEducationTypeLoading &&
      !isMajorsLoading &&
      !isFacultyLoading &&
      !isLoadingStudentData &&
      studentData
    ) {
      setStudent({
        hoTenSinhVien: studentData[0].hoTenSinhVien,
        maKhoaHoc: studentData[0].maKhoaHoc,
        maChuyenNganh: studentData[0].maChuyenNganh,
        maHeDaoTao: studentData[0].maHeDaoTao,
        tinhTrangHocTap: studentData[0].tinhTrangHocTap,
        ngaySinh: new Date(studentData[0].ngaySinh).toISOString().split('T')[0],
        gioiTinh: studentData[0].gioiTinh,
        email: studentData[0].email,
        emailPassword: studentData[0].emailPassword,
        username: studentData[0].username,
        usernamePassword: studentData[0].usernamePassword,
        soTaiKhoanNganHangDinhDanh: studentData[0].soTaiKhoanNganHangDinhDanh,
        anhTheSinhVien: studentData[0].anhTheSinhVien,
        ngayNhapHoc: new Date(studentData[0].ngayNhapHoc)
          .toISOString()
          .split('T')[0],
        maSinhVien: studentData[0].maSinhVien
      });
      const selectedEducationType = educationTypeData.find(
        education => education.maHeDaoTao === studentData[0].maHeDaoTao
      );
      setEducationType(
        capitalizeFirstLetter(selectedEducationType.tenHeDaoTao)
      );

      const selectedFaculty = faculties.find(
        faculty => faculty.maKhoaHoc === studentData[0].maKhoaDaoTao
      );
      setFaculty(capitalizeFirstLetter(selectedFaculty.tenKhoaDaoTao));

      setGender(studentData[0].gioiTinh == 'Nam' ? 'Nam' : 'Nữ');
      setLearningStatus(capitalizeFirstLetter(studentData[0].tinhTrangHocTap));

      const selectedMajor = majors.find(
        major => major.maChuyenNganh === studentData[0].maChuyenNganh
      );
      setMajor(capitalizeFirstLetter(selectedMajor.tenChuyenNganh));

      setImageSrc(studentData[0].anhTheSinhVien);
    }
  }, [
    studentData,
    isLoadingStudentData,
    educationTypeData,
    faculties,
    majors,
    isEducationTypeLoading,
    isMajorsLoading,
    isFacultyLoading
  ]);

  function validateName(name: string) {
    let isValidName = true;
    if (
      /[!@#$%^&*(),.?":{}|<>]/g.test(name) ||
      !/^[A-Z]/.test(name) ||
      /\d+/g.test(name)
    ) {
      isValidName = false;
    }
    return isValidName;
  }

  const validateEmail = (inputEmail: string) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the input email against the regular expression
    return emailRegex.test(inputEmail);
  };

  const validateAge = (inputDob: string) => {
    const birthDate = new Date(inputDob);
    const currentDate = new Date();

    // Calculate the age based on the difference in years
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Validate that the age is between 18 and 65
    return age >= 18 && age <= 65;
  };

  const validateAccountNumber = inputString => {
    // Regular expression for validating a string with only numbers and length between 9 and 14
    const regex = /^\d{9,14}$/;

    // Test the input string against the regular expression
    return regex.test(inputString);
  };

  const inputRef = useRef(null);

  const handleLoadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith('image/')) {
        // Update the image source with the selected file
        const newImageSrc = URL.createObjectURL(file);
        setImageSrc(newImageSrc);
        setFile(file);
      } else {
        console.error('Invalid file format. Please select an image.');
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateName(student.hoTenSinhVien)) {
      toast.error('Tên không hợp lệ');
      return;
    }

    if (!validateEmail(student.email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    if (!validateAge(student.ngaySinh)) {
      toast.error('Tuổi sinh viên phải nằm trong khoảng 18 đến 65');
      return;
    }

    if (!validateAccountNumber(student.soTaiKhoanNganHangDinhDanh)) {
      toast.error(
        'Số tài khoản ngân hàng phải chỉ chứa toàn số và độ dài 9-14 số'
      );
      return;
    }

    createStudentImageMutation.mutate(
      { id: 'test', image: file },
      {
        onSuccess: data => {
          setStudent(prevStudent => ({
            ...prevStudent,
            anhTheSinhVien: data.data.imageUrls[0]
          }));

          updateStudentMutation.mutate(
            {
              student: {
                ...student,
                anhTheSinhVien: data.data.imageUrls[0]
              },
              id: id
            },
            {
              onSuccess: data => {
                setStudent({
                  hoTenSinhVien: '',
                  maKhoaHoc: 1,
                  maChuyenNganh: 1,
                  maHeDaoTao: 5,
                  tinhTrangHocTap: 'đang học',
                  ngaySinh: new Date().toLocaleDateString('en-GB'),
                  gioiTinh: 'Nam',
                  email: '',
                  emailPassword: '',
                  username: '',
                  usernamePassword: '',
                  soTaiKhoanNganHangDinhDanh: '',
                  anhTheSinhVien: '',
                  ngayNhapHoc: new Date().toLocaleDateString('en-GB'),
                  maSinhVien: 0
                });
                setMajor('Khoa học máy tính');
                setFaculty('Khoa học máy tính');
                setEducationType('đại trà');
                setGender('Nam');
                setLearningStatus('Đang học');
              },
              onError: error => {
                console.log(student);
                toast.error(error.response.data.message);
              }
            }
          );
        },
        onError: error => {
          updateStudentMutation.mutate(
            {
              student: student,
              id: id
            },
            {
              onSuccess: data => {
                setStudent({
                  hoTenSinhVien: '',
                  maKhoaHoc: 1,
                  maChuyenNganh: 1,
                  maHeDaoTao: 5,
                  tinhTrangHocTap: 'đang học',
                  ngaySinh: new Date().toLocaleDateString('en-GB'),
                  gioiTinh: 'Nam',
                  email: '',
                  emailPassword: '',
                  username: '',
                  usernamePassword: '',
                  soTaiKhoanNganHangDinhDanh: '',
                  anhTheSinhVien: '',
                  ngayNhapHoc: new Date().toLocaleDateString('en-GB'),
                  maSinhVien: 0
                });
                setMajor('Khoa học máy tính');
                setFaculty('Khoa học máy tính');
                setEducationType('đại trà');
                setGender('Nam');
                setLearningStatus('Đang học');
              },
              onError: error => {
                console.log(student);
                toast.error(error.response.data.message);
              }
            }
          );
          // toast.error(error.response.data.message);
        }
      }
    );
  };

  const onDeleteStudent = () => {
    const confirmBox = window.confirm(
      'Bạn có thật sự muốn xóa sinh viên này không'
    );
    console.log('delete clicked');
    if (confirmBox === true) {
      deleteStudentMutation.mutate(id);
    }
  };
  if (
    isEducationTypeLoading ||
    isEducationTypeLoading ||
    isEducationTypeLoading ||
    isFacultyLoading ||
    isMajorsLoading ||
    isLoadingStatus ||
    isLoadingStudentData
  )
    return <LoadingIndicator />;

  return (
    <form
      id='student-form'
      className='w-full bg-white p-5 shadow-lg'
      onSubmit={onSubmit}
    >
      <h1>Thông tin sinh viên</h1>
      <div className='mt-4 grid grid-cols-4 gap-8'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='maSinhVien' value='Mã sinh viên' />
          </div>
          <TextInput
            id='maSinhVien'
            type='text'
            placeholder=''
            value={student.maSinhVien}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên' />
          </div>
          <TextInput
            id='hoTenSinhVien'
            type='text'
            placeholder='Nhập tên sinh viên'
            value={student.hoTenSinhVien}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='gioiTinh' value='Giới tính' />
          </div>
          <Select
            id='gioiTinh'
            required
            value={gender}
            onChange={handleGenderChange}
          >
            <option>Nam</option>
            <option>Nữ</option>
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='ngaySinh' value='Ngày sinh' />
          </div>
          <Datepicker
            id='ngaySinh'
            value={new Date(student.ngaySinh).toISOString().split('T')[0]}
            onSelectedDateChanged={handleDateOfBirthChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='start-learning-date' value='Ngày nhập học' />
          </div>
          <Datepicker
            id='ngayNhapHoc'
            value={new Date(student.ngayNhapHoc).toISOString().split('T')[0]}
            onSelectedDateChanged={handleLearningStartDateChange}
          ></Datepicker>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='faculty' value='Khoa' />
          </div>
          <Select
            id='faculty-selection'
            required
            value={faculty}
            onChange={handleFacultyChange}
          >
            {!isFacultyLoading &&
              faculties.map(faculty => (
                <option key={faculty.maKhoaDaoTao}>
                  {faculty.tenKhoaDaoTao}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='major' value='Ngành' />
          </div>
          <Select
            id='major-selection'
            required
            value={major}
            onChange={handleMajorChange}
          >
            {!isMajorsLoading &&
              majors.map(major => (
                <option key={major.maChuyenNganh}>
                  {capitalizeFirstLetter(major.tenChuyenNganh)}
                </option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='education-types' value='Hệ đào tạo' />
          </div>
          <Select
            id='education-selection'
            required
            value={educationType}
            onChange={handleEducationChange}
          >
            {!isEducationTypeLoading &&
              educationTypeData.map(educationType => (
                <option key={educationType.maHeDaoTao}>
                  {capitalizeFirstLetter(educationType.tenHeDaoTao)}
                </option>
              ))}
          </Select>
        </div>
        {/* <div>
          <div className='mb-2 block'>
            <Label htmlFor='address' value='Địa chỉ' />
          </div>
          <TextInput
            id='address'
            type='text'
            placeholder='Nhập địa chỉ sinh viên'
            required
          />
        </div> */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email' />
          </div>
          <TextInput
            id='email'
            type='text'
            placeholder='Nhập email sinh viên'
            value={student.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div>
          <div className='mb-2 block'>
            <Label htmlFor='phoneNumber' value='Số điện thoại' />
          </div>
          <TextInput
            id='phoneNumber'
            type='text'
            placeholder='Nhập số điện thoại'
            required
          />
        </div> */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='learning_status' value='Tình trạng học tập' />
          </div>
          <Select
            id='learning-status'
            required
            value={learningStatus}
            onChange={handleLearningStatusChange}
          >
            {!isLoadingStatus &&
              learningStatuses.map(status => (
                <option key={status}>{capitalizeFirstLetter(status)}</option>
              ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='account' value='Số tài khoản định danh' />
          </div>
          <TextInput
            id='soTaiKhoanNganHangDinhDanh'
            type='number'
            min={0}
            placeholder='Nhập số tài khoản định danh'
            value={student.soTaiKhoanNganHangDinhDanh}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='username' value='Tên tài khoản SV' />
          </div>
          <TextInput
            id='username'
            type='text'
            placeholder='Nhập tên tài khoản sinh viên'
            value={student.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='usernamePassword' value='Mật khẩu tài khoản SV' />
          </div>
          <TextInput
            id='usernamePassword'
            type='text'
            placeholder='Nhập mật khẩu tài khoản SV'
            value={student.usernamePassword}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className='mt-5 flex items-center space-x-6 align-middle'>
        <img
          alt='Ảnh sinh viên'
          className='border-rounded h-32 w-32 rounded-full'
          src={imageSrc}
        ></img>
        <div className='flex flex-col space-y-2'>
          <Label
            htmlFor='studentImage'
            value='Tải ảnh sinh viên (150px X 150px)'
          />
          <div className='flex items-center space-x-3 align-middle'>
            <Button color='sidebar' onClick={handleLoadImage}>
              Chọn ảnh
            </Button>
            <input
              type='file'
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept='image/jpeg, image/png, image/gif, image/svg+xml'
            />
            {/* <span>Chựa chọn file</span> */}
          </div>
        </div>
      </div>
      <div className='mt-4 flex space-x-5'>
        <Button type='submit' color='failure'>
          Lưu
        </Button>
        <Button className='bg-sidebar' onClick={onDeleteStudent}>
          Xóa
        </Button>
      </div>
    </form>
  );
};

export default EditStudentForm;
