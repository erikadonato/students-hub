import axios from 'axios';
import { SaveStudentDto } from './dto/saveStudentDto.dto';
import { SearchStudentDto } from './dto/searchStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';

const BASE_URL = 'http://localhost:3001/student';

export const searchStudent = async (params?: SearchStudentDto) => {
  let validParams: any = {}; 
  validParams['cpf'] = params?.cpf || undefined; 
  validParams['email'] = params?.email || undefined;
  validParams['nome'] = params?.name || undefined; 

  if(Object.keys(validParams).length !== 0) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, { params: {
        cpf: params?.cpf || undefined,
        email: params?.email || undefined,
        nome: params?.name || undefined
      } });
      return response.data;
    } catch (error) {
      return error
    }
  }

  const response = await axios.get(`${BASE_URL}/search`, {});
  return response.data;
};

export const saveStudent = async (student: SaveStudentDto) => {
  const response = await axios.post(`${BASE_URL}/save`, student);
  return response.data;
};

export const updateStudent = async (student: UpdateStudentDto) => {
  const response = await axios.patch(`${BASE_URL}/update`, student);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/delete`, { params: { id } });
  return response.data;
};