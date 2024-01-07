import { URL_GET_TUTION_FEE } from 'src/constants/url';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const tuitionFeeApi = {
  getStudentTutionFee(
    offset: number,
    limit: number,
    studentId: number,
    semesterId: number,
    signal?: AbortSignal
  ) {
    const urlWithParams = `${URL_GET_TUTION_FEE}?offset=${offset}&limit=${limit}`;
    const rawBody = {
      filterBy: {
        maSinhVien: studentId,
        maHocKyNamHoc: semesterId
      }
    };
    console.log(rawBody);
    return http.post<SuccessResponse<TutionFee[]>>(urlWithParams, rawBody, {
      signal
    });
  }
};
