<template>
  <div class="mt-32 py-32">
    <h1 >QR Code Generator</h1>
    <button @click="generateQR">Generate QR Code</button>

    <!-- QR 코드 이미지를 표시 -->
    <div v-if="qrCodeSrc">
      <img :src="qrCodeSrc" alt="QR Code" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const qrCodeSrc = ref(null)

// QR 코드 생성 함수
const generateQR = async () => {
  try {
    // FastAPI에서 QR 코드 생성 API 호출
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/generate_qr`, {
      method: 'POST',
    })
    
    if (response.ok) {
      // Blob으로 이미지 데이터를 받아옴
      const imageBlob = await response.blob()

      // Blob 데이터를 URL로 변환하여 img 태그에 설정
      qrCodeSrc.value = URL.createObjectURL(imageBlob)
    } else {
      console.error('Failed to generate QR code:', response.statusText)
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
  }
}
</script>
