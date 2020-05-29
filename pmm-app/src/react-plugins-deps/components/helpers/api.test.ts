import axios from 'axios';
import { apiRequestQAN } from './api';

jest.mock('axios');
jest.mock('./notification-manager', () => () => ({}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
xdescribe('GET tests', () => {
  xit('should return data', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.get('/test/path', { params: { key: 'value' } });
    await expect(result).toEqual('some data');
  });
});

describe('POST tests', () => {
  xit('should return data', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.post('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('PATCH tests', () => {
  xit('should return data', async () => {
    mockedAxios.patch.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.patch('/test/path', { key: 'value' });
    await expect(result).toEqual('some data');
  });
});

describe('DELETE tests', () => {
  xit('should return data', async () => {
    mockedAxios.delete.mockResolvedValue({ data: 'some data' });
    const result = await apiRequestQAN.delete('/test/path');
    await expect(result).toEqual('some data');
  });
});
