import { ref } from 'vue'

export const useGoogleDrive = () => {
  const isUploading = ref(false)
  const uploadError = ref('')

  // Google Drive API 클라이언트 초기화
  const initGoogleDriveAPI = () => {
    return new Promise((resolve, reject) => {
      // Google API 클라이언트가 로드되었는지 확인
      if (window.gapi && window.gapi.client) {
        resolve(window.gapi.client)
        return
      }

      // Google API 스크립트 로드
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            clientId: process.env.GOOGLE_CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.file'
          }).then(() => {
            resolve(window.gapi.client)
          }).catch(reject)
        })
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  // Google Drive에 이미지 업로드
  const uploadImageToDrive = async (file) => {
    try {
      isUploading.value = true
      uploadError.value = ''

      const client = await initGoogleDriveAPI()
      
      // 사용자 인증
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (!auth2.isSignedIn.get()) {
        await auth2.signIn()
      }

      // 파일을 Base64로 인코딩
      const base64Data = await fileToBase64(file)
      
      // Google Drive API를 통해 파일 업로드
      const response = await client.drive.files.create({
        resource: {
          name: file.name,
          mimeType: file.type,
          parents: [process.env.GOOGLE_DRIVE_FOLDER_ID] // 특정 폴더에 업로드하려면 폴더 ID 설정
        },
        media: {
          mimeType: file.type,
          body: base64ToBlob(base64Data, file.type)
        }
      })

      // 공유 링크 생성
      await client.drive.permissions.create({
        fileId: response.result.id,
        resource: {
          role: 'reader',
          type: 'anyone'
        }
      })

      // 공개 URL 반환
      const imageUrl = `https://drive.google.com/uc?id=${response.result.id}`
      return imageUrl

    } catch (error) {
      console.error('Google Drive upload error:', error)
      uploadError.value = '이미지 업로드 중 오류가 발생했습니다.'
      throw error
    } finally {
      isUploading.value = false
    }
  }

  // 파일을 Base64로 변환
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  // Base64를 Blob으로 변환
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  // 파일 유효성 검사
  const validateFile = (file) => {
    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('파일 크기는 5MB를 초과할 수 없습니다.')
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      throw new Error('이미지 파일만 업로드 가능합니다.')
    }

    return true
  }

  return {
    isUploading,
    uploadError,
    uploadImageToDrive,
    validateFile
  }
}
