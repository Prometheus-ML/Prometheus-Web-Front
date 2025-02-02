import { defineEventHandler, getQuery, sendError } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) {
    return sendError(event, new Error('Missing "id" query parameter'));
  }

  try {
    const response = await axios.get(
      `https://drive.usercontent.google.com/download?id=${id}&export=view`,
      { responseType: 'stream' }
    );

    event.node.res.setHeader('Content-Type', response.headers['content-type']); // MIME 타입 설정
    event.node.res.setHeader('Cache-Control', 'public, max-age=3600'); // 캐싱 설정 (선택 사항)
    response.data.pipe(event.node.res); // 스트림 데이터를 클라이언트로 전달

    // 스트림 작업 완료를 보장
    return new Promise((resolve, reject) => {
      response.data.on('end', resolve);
      response.data.on('error', reject);
    });
  } catch (error) {
    console.error('Error fetching Google Drive image:', error.message);
    return sendError(event, new Error('Failed to fetch image from Google Drive'));
  }
});
