<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="!isUploadingImage && closeModal()"></div>

      <!-- 모달 컨텐츠 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ isEdit ? '멤버 수정' : '멤버 추가' }}
              </h3>
               <!-- 권한 제한 메시지 -->
               <div v-if="isEdit && !canModifyEntireMember()" class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                 <p class="text-sm text-yellow-800">
                   {{ getModifiableGrantLevel() }} 권한 이하의 정보만 수정하실 수 있습니다.
                 </p>
               </div>
              
              <!-- 탭 네비게이션 -->
              <div class="mt-4 border-b border-gray-200">
                <nav class="-mb-px flex space-x-8">
                  <button
                    @click="activeTab = 'basic'"
                    :class="[
                      'py-2 px-1 border-b-2 font-medium text-sm',
                      activeTab === 'basic'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    기본 정보
                  </button>
                  <button
                    @click="activeTab = 'club'"
                    :class="[
                      'py-2 px-1 border-b-2 font-medium text-sm',
                      activeTab === 'club'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    동아리 정보
                  </button>
                  <button
                    @click="activeTab = 'optional'"
                    :class="[
                      'py-2 px-1 border-b-2 font-medium text-sm',
                      activeTab === 'optional'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    선택 정보
                  </button>
                </nav>
              </div>

              <!-- 기본 정보 탭 -->
              <div v-if="activeTab === 'basic'" class="mt-6">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                         <!-- 이름 -->
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">이름 <span class="text-red-500">*</span></label>
                        <input
                          id="name"
                          v-model="form.name"
                          :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                          placeholder="홍길동"
                          required
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                      <!-- 이메일 -->
                      <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">이메일 <span class="text-red-500">*</span></label>
                        <input
                          id="email"
                          v-model="form.email"
                          :disabled="isEdit && !canModifyEntireMember()"
                          type="email"
                          placeholder="hong@example.com"
                          required
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                      <!-- 학번 -->
                      <div>
                                               <label for="student_id" class="block text-sm font-medium text-gray-700">학번 <span class="text-red-500">*</span></label>
                        <input
                         id="student_id"
                         v-model="form.student_id"
                         :disabled="isEdit && !canModifyEntireMember()"
                         type="text"
                         placeholder="21"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                      <!-- 전화번호 -->
                      <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">전화번호 <span class="text-red-500">*</span></label>
                        <div class="mt-1 flex space-x-1">
                          <input
                            id="phone1"
                            v-model="phoneParts[0]"
                            :disabled="isEdit && !canModifyEntireMember()"
                            type="text"
                            maxlength="3"
                            placeholder="010"
                            class="w-16 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                            @input="updatePhone"
                          >
                          <span class="flex items-center text-gray-500 text-sm">-</span>
                          <input
                            id="phone2"
                            v-model="phoneParts[1]"
                            :disabled="isEdit && !canModifyEntireMember()"
                            type="text"
                            maxlength="4"
                            placeholder="1234"
                            class="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                            @input="updatePhone"
                          >
                          <span class="flex items-center text-gray-500 text-sm">-</span>
                          <input
                            id="phone3"
                            v-model="phoneParts[2]"
                            :disabled="isEdit && !canModifyEntireMember()"
                            type="text"
                            maxlength="4"
                            placeholder="5678"
                            class="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                            @input="updatePhone"
                          >
                        </div>
                      </div>

                      <!-- 학교 -->
                      <div>
                        <label for="school" class="block text-sm font-medium text-gray-700">학교 <span class="text-red-500">*</span></label>
                        <input
                          id="school"
                          v-model="form.school"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                          placeholder="프메대학교"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                      <!-- 전공 -->
                      <div>
                        <label for="major" class="block text-sm font-medium text-gray-700">전공 <span class="text-red-500">*</span></label>
                        <input
                          id="major"
                          v-model="form.major"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                          placeholder="인공지능학과"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                                                               <!-- 생년월일 -->
                      <div>
                        <label for="birthdate" class="block text-sm font-medium text-gray-700">생년월일 <span class="text-red-500">*</span></label>
                        <input
                          id="birthdate"
                          v-model="form.birthdate"
                          :disabled="isEdit && !canModifyEntireMember()"
                          type="date"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                      <!-- 프로필 이미지 -->
                      <div class="sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">프로필 이미지</label>
                        <div class="mt-2 flex items-center space-x-4">
                          <!-- 현재 이미지 표시 -->
                          <div v-if="form.profile_image_url" class="flex-shrink-0">
                            <img 
                              :src="form.profile_image_url" 
                              alt="프로필 이미지" 
                              class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                              @error="onProfileImageError"
                            >
                          </div>
                          <!-- 기본 이미지 -->
                          <div v-else class="flex-shrink-0">
                            <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                          </div>
                          
                          <!-- 이미지 업로드 버튼 -->
                          <div class="flex-1">
                            <input
                              ref="fileInputRef"
                              type="file"
                              accept="image/*"
                              class="hidden"
                              @change="onProfileImageFileChange"
                            />
                            <button
                              type="button"
                              @click="triggerProfileImageSelect"
                              :disabled="isUploadingImage || (isEdit && !canModifyEntireMember())"
                              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg v-if="!isUploadingImage" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <svg v-else class="animate-spin h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                              </svg>
                              {{ isUploadingImage ? '업로드 중...' : (form.profile_image_url ? '이미지 변경' : '이미지 업로드') }}
                            </button>
                            <p v-if="isEdit && !canModifyEntireMember()" class="mt-1 text-sm text-gray-500">
                              권한이 없어 이미지를 변경할 수 없습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                  </div>
                </form>
              </div>

              <!-- 동아리 정보 탭 -->
              <div v-if="activeTab === 'club'" class="mt-6">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                         <!-- 기수 -->
                      <div>
                        <label for="gen" class="block text-sm font-medium text-gray-700">
                          기수 <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="gen"
                          v-model.number="form.gen"
                          :disabled="isEdit && !canModifyEntireMember()"
                          type="number"
                          min="0"
                         placeholder="0"
                          required
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      

                      
                     <!-- 상태 -->
                      <div>
                                               <label for="status" class="block text-sm font-medium text-gray-700">상태 <span class="text-red-500">*</span></label>
                        <select
                          id="status"
                          v-model="form.status"
                          :disabled="isEdit && !canModifyEntireMember()"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                         <option value="active">활동기수</option>
                         <option value="alumni">알럼나이</option>
                       </select>
                      </div>
                      
                     <!-- 권한 -->
                     <div>
                       <label for="grant" class="block text-sm font-medium text-gray-700">권한 <span class="text-red-500">*</span></label>
                       <select
                         id="grant"
                         v-model="form.grant"
                         :disabled="isEdit && !canModifyEntireMember()"
                         class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                       >
                         <option value="Root" :disabled="!canAssignGrant('Root')">Root</option>
                         <option value="Super" :disabled="!canAssignGrant('Super')">Super</option>
                         <option value="Administrator" :disabled="!canAssignGrant('Administrator')">Administrator</option>
                         <option value="Manager" :disabled="!canAssignGrant('Manager')">Manager</option>
                         <option value="Member" :disabled="!canAssignGrant('Member')">Member</option>
                       </select>
                       <p v-if="isEdit && !canModifyEntireMember()" class="mt-1 text-sm text-gray-500">
                         자신보다 높은 권한은 할당할 수 없습니다.
                       </p>
                     </div>
                     
                     <!-- 활동 시작일 -->
                      <div>
                       <label for="activity_start_date" class="block text-sm font-medium text-gray-700">활동 시작일</label>
                        <input
                         id="activity_start_date"
                         v-model="form.activity_start_date"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="date"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                     <!-- 활동 기수 -->
                     <div class="sm:col-span-2">
                       <label class="block text-sm font-medium text-gray-700">활동 기수</label>
                       <div class="mt-2">
                         <!-- 입력 필드 -->
                         <div class="flex items-center space-x-2 mb-2">
                           <input
                             v-model="activeGenInput"
                             @keydown.enter.prevent="addActiveGen"
                             :disabled="isEdit && !canModifyEntireMember()"
                             type="number"
                             min="0"
                             placeholder="기수를 입력하고 엔터를 누르세요"
                             class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                           >
                           <button
                             type="button"
                             @click="addActiveGen"
                             :disabled="isEdit && !canModifyEntireMember()"
                             class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                             추가
                           </button>
                         </div>
                         <!-- 태그 목록 -->
                         <div class="flex flex-wrap gap-2">
                           <div
                             v-for="gen in form.active_gens"
                             :key="gen"
                             class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                           >
                             <span>{{ gen }}기</span>
                          <button
                            type="button"
                               @click="removeActiveGen(gen)"
                               :disabled="isEdit && !canModifyEntireMember()"
                               class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                               </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                     <!-- 이력 -->
                     <div class="sm:col-span-2">
                       <div class="flex justify-between items-center">
                         <label for="history" class="block text-sm font-medium text-gray-700">이력</label>
                         <span class="text-sm text-gray-500">{{ (historyInput || '').length }}/300</span>
                       </div>
                       <div class="mt-2">
                         <!-- 입력 필드 -->
                         <div class="flex items-center space-x-2 mb-2">
                           <input
                             v-model="historyInput"
                             @keydown.enter.prevent="addHistory"
                             :disabled="isEdit && !canModifyEntireMember()"
                             type="text"
                             maxlength="300"
                             placeholder="이력을 입력하고 엔터를 누르세요 (예: AI 챗봇 개발, 웹 애플리케이션 프로젝트, 머신러닝 스터디)"
                             class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                           >
                           <button
                             type="button"
                             @click="addHistory"
                             :disabled="isEdit && !canModifyEntireMember()"
                             class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                             추가
                           </button>
                         </div>
                         <!-- 태그 목록 -->
                         <div class="flex flex-wrap gap-2">
                           <div
                             v-for="(item, index) in form.history"
                             :key="index"
                             class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                           >
                             <span>{{ item }}</span>
                             <button
                               type="button"
                               @click="removeHistory(index)"
                               :disabled="isEdit && !canModifyEntireMember()"
                               class="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 hover:bg-green-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                               </svg>
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
                  </div>
                </form>
              </div>

              <!-- 선택 정보 탭 -->
              <div v-if="activeTab === 'optional'" class="mt-6">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                         <!-- GitHub -->
                      <div>
                        <label for="github" class="block text-sm font-medium text-gray-700">GitHub</label>
                        <input
                          id="github"
                          v-model="form.github"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="url"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                                         <!-- Notion -->
                      <div>
                        <label for="notion" class="block text-sm font-medium text-gray-700">Notion</label>
                        <input
                          id="notion"
                          v-model="form.notion"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="url"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                     <!-- Figma -->
                      <div>
                        <label for="figma" class="block text-sm font-medium text-gray-700">Figma</label>
                        <input
                          id="figma"
                          v-model="form.figma"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="url"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                                         <!-- 카카오 ID -->
                      <div>
                       <label for="kakao_id" class="block text-sm font-medium text-gray-700">카카오 ID</label>
                        <input
                          id="kakao_id"
                          v-model="form.kakao_id"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                                         <!-- 인스타그램 ID -->
                      <div>
                       <label for="instagram_id" class="block text-sm font-medium text-gray-700">인스타그램 ID</label>
                        <input
                          id="instagram_id"
                          v-model="form.instagram_id"
                         :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                  </div>

                                         <!-- MBTI와 커피챗 활성화 -->
                      <div class="flex space-x-4">
                        <div class="flex-1">
                        <label for="mbti" class="block text-sm font-medium text-gray-700">MBTI</label>
                        <input
                          id="mbti"
                          v-model="form.mbti"
                           :disabled="isEdit && !canModifyEntireMember()"
                          type="text"
                           maxlength="4"
                            placeholder="ENFP"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                           :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                        >
                      </div>
                      
                        <div class="flex-1">
                        <label for="coffee_chat_enabled" class="block text-sm font-medium text-gray-700">커피챗 활성화</label>
                         <select
                              id="coffee_chat_enabled"
                              v-model="form.coffee_chat_enabled"
                           :disabled="isEdit && !canModifyEntireMember()"
                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                           :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                            >
                           <option :value="true">활성화</option>
                           <option :value="false">비활성화</option>
                         </select>
                        </div>
                      </div>
                      
                                         <!-- 자기소개 -->
                     <div class="sm:col-span-2">
                      <div class="flex justify-between items-center">
                        <label for="self_introduction" class="block text-sm font-medium text-gray-700">자기소개</label>
                        <span class="text-sm text-gray-500">{{ selfIntroductionLength }}/300</span>
                    </div>
                      <textarea
                        id="self_introduction"
                        v-model="form.self_introduction"
                        :disabled="isEdit && !canModifyEntireMember()"
                        rows="5"
                        maxlength="300"
                        placeholder="자신에 대해 간단히 소개해주세요. (예: 안녕하세요! 저는 AI에 관심이 많은 학생입니다. 다양한 프로젝트를 통해 실력을 키우고 싶습니다.)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                      ></textarea>
                    </div>
                    
                                         <!-- 추가 경력 -->
                     <div class="sm:col-span-2">
                      <div class="flex justify-between items-center">
                      <label for="additional_career" class="block text-sm font-medium text-gray-700">추가 경력</label>
                        <span class="text-sm text-gray-500">{{ additionalCareerLength }}/300</span>
                      </div>
                      <textarea
                        id="additional_career"
                        v-model="form.additional_career"
                         :disabled="isEdit && !canModifyEntireMember()"
                        rows="5"
                        maxlength="300"
                        placeholder="추가 경력이나 활동을 입력해주세요. (예: AI 스터디 그룹 리더, 웹 개발 프로젝트 참여, 해커톤 수상 경험 등)"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         :class="isEdit && !canModifyEntireMember() ? 'bg-gray-100 cursor-not-allowed' : ''"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="handleSubmit"
             :disabled="isSubmitting || isUploadingImage || (isEdit && !canModifyEntireMember())"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
          >
            <div v-if="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ isEdit ? '수정' : '추가' }}
          </button>
           <button
             v-if="isEdit && canDeleteMember()"
             @click="handleDelete"
              :disabled="isSubmitting || isUploadingImage"
             class="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
           >
             삭제
          </button>
          <button
            @click="!isUploadingImage && closeModal()"
            :disabled="isUploadingImage"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
             닫기
          </button>
        </div>

        <!-- 업로드 중 오버레이 -->
        <div v-if="isUploadingImage" class="absolute inset-0 z-20 bg-white bg-opacity-60 backdrop-blur-[2px] flex items-center justify-center">
          <div class="flex items-center space-x-3 text-gray-700">
            <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span class="text-sm font-medium">이미지 업로드 중...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/composables/useAuth.js';
import { useRuntimeConfig } from '#app';

const authStore = useAuthStore();
const config = useRuntimeConfig();
const API_BASE_URL = config.public.apiBaseUrl;

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  member: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'submit', 'delete']);

// 상태 변수
const activeTab = ref('basic');
const isSubmitting = ref(false);

// 태그 입력을 위한 변수들
const activeGenInput = ref('');
const historyInput = ref('');

// 전화번호 분리 입력을 위한 변수들
const phoneParts = ref(['', '', '']);

// 폼 데이터
const form = ref({
  name: '',
  email: '',
  gen: 0,
  school: '',
  major: '',
  student_id: '',
  birthdate: '',
  phone: '',
  grant: 'Member',
  status: 'active',
  activity_start_date: '',
  profile_image_url: '',
  github: '',
  notion: '',
  figma: '',
  kakao_id: '',
  instagram_id: '',
  mbti: '',
  self_introduction: '',
  additional_career: '',
  coffee_chat_enabled: false,
  active_gens: [],
  history: []
});

// 편집 모드인지 확인
const isEdit = computed(() => !!props.member);

// 활동 기수 추가 함수
const addActiveGen = () => {
  const gen = parseInt(activeGenInput.value);
  if (gen && gen >= 1 && gen <= 15 && !form.value.active_gens.includes(gen)) {
    form.value.active_gens.push(gen);
    form.value.active_gens.sort((a, b) => a - b); // 정렬
    activeGenInput.value = '';
  }
};

// 활동 기수 제거 함수
const removeActiveGen = (gen) => {
  const index = form.value.active_gens.indexOf(gen);
  if (index > -1) {
    form.value.active_gens.splice(index, 1);
  }
};

// 이력 추가 함수
const addHistory = () => {
  const item = historyInput.value.trim();
  if (item && !form.value.history.includes(item)) {
    // 300자 제한 확인
    if (item.length > 300) {
      alert('이력은 300자를 초과할 수 없습니다.');
      return;
    }
    form.value.history.push(item);
    historyInput.value = '';
  }
};

// 이력 제거 함수
const removeHistory = (index) => {
  form.value.history.splice(index, 1);
};

// 전화번호 업데이트 함수
const updatePhone = () => {
  const parts = phoneParts.value.filter(part => part.trim() !== '');
  form.value.phone = parts.join('-');
};

// 전화번호를 분리된 부분으로 변환
const parsePhone = (phone) => {
  if (!phone) {
    phoneParts.value = ['', '', ''];
    return;
  }
  
  const parts = phone.split('-');
  phoneParts.value = [
    parts[0] || '',
    parts[1] || '',
    parts[2] || ''
  ];
};

// 권한 레벨 매핑
const grantHierarchy = {
  'Member': 1,
  'Manager': 2,
  'Administrator': 3,
  'Super': 4,
  'Root': 5
};

// 현재 사용자가 권한을 수정할 수 있는지 확인
const canManageGrant = (targetMemberGrant) => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const targetLevel = grantHierarchy[targetMemberGrant] || 0;
  return currentLevel > targetLevel;
};

// 현재 사용자의 권한 반환
const getCurrentUserGrant = () => {
  return authStore.user?.grant || 'Member';
};

// 멤버 삭제 권한 확인 (Super, Root만)
const canDeleteMember = () => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const requiredLevel = grantHierarchy['Super'] || 4;
  
  return currentLevel >= requiredLevel;
};

// 전체 멤버 정보 수정 권한 확인
const canModifyEntireMember = () => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const memberLevel = grantHierarchy[form.value.grant] || 0;
  
  // 현재 사용자가 멤버보다 높은 권한을 가지고 있어야 수정 가능
  return currentLevel > memberLevel;
};

// 수정 가능한 권한 레벨 반환
const getModifiableGrantLevel = () => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  
  // 현재 사용자보다 낮은 권한만 수정 가능
  if (currentLevel >= grantHierarchy['Super']) return 'Super';
  if (currentLevel >= grantHierarchy['Administrator']) return 'Administrator';
  if (currentLevel >= grantHierarchy['Manager']) return 'Manager';
  return 'Member';
};

// 권한 할당 가능한지 확인
const canAssignGrant = (grant) => {
  const currentUserGrant = authStore.user?.grant || 'Member';
  const currentLevel = grantHierarchy[currentUserGrant] || 0;
  const targetLevel = grantHierarchy[grant] || 0;
  return currentLevel > targetLevel;
};

// 이력을 문자열로 변환
const historyString = computed({
  get() {
    return form.value.history?.join('\n') || '';
  },
  set(value) {
    form.value.history = value ? value.split('\n').filter(line => line.trim() !== '') : [];
  }
});

// 글자수 계산을 위한 computed 속성들
const selfIntroductionLength = computed(() => {
  return (form.value.self_introduction || '').length;
});

const historyInputLength = computed(() => {
  return (historyInput.value || '').length;
});

const additionalCareerLength = computed(() => {
  return (form.value.additional_career || '').length;
});

// 모달 닫기
const closeModal = () => {
  emit('close');
  resetForm();
};

// 폼 초기화
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    gen: 0,
    school: '',
    major: '',
    student_id: '',
    birthdate: '',
    phone: '',
    grant: 'Member', // 항상 Member로 고정
    status: 'active',
    activity_start_date: '',
    profile_image_url: '',
    github: '',
    notion: '',
    figma: '',
    kakao_id: '',
    instagram_id: '',
    mbti: '',
    self_introduction: '',
    additional_career: '',
    coffee_chat_enabled: false,
    active_gens: [],
    history: []
  };
  activeTab.value = 'basic';
  activeGenInput.value = '';
  historyInput.value = '';
  phoneParts.value = ['', '', ''];
};

// 멤버 데이터로 폼 초기화
const initializeForm = () => {
  if (props.member) {
    Object.keys(form.value).forEach(key => {
      if (props.member[key] !== undefined) {
        // active_gens와 history는 배열로 처리
        if (key === 'active_gens' || key === 'history') {
          form.value[key] = Array.isArray(props.member[key]) ? props.member[key] : [];
        } else {
          form.value[key] = props.member[key];
        }
      }
    });
    
    // 전화번호 파싱
    parsePhone(form.value.phone);
  }
  
  // 입력 필드 초기화
  activeGenInput.value = '';
  historyInput.value = '';
  
  // null 체크를 위한 기본값 설정
  if (!form.value.self_introduction) {
    form.value.self_introduction = '';
  }
  if (!form.value.additional_career) {
    form.value.additional_career = '';
  }
};

// 폼 제출 처리
const handleSubmit = async () => {
  if (isEdit.value) {
    if (!confirm(`정말로 ${form.value.name}님의 정보를 수정하시겠습니까?`)) {
      return;
    }
  }
  
  try {
    isSubmitting.value = true;
    
    const submitData = { ...form.value };
    
    // 빈 문자열을 null로 변환
    Object.keys(submitData).forEach(key => {
      if (submitData[key] === '') {
        submitData[key] = null;
      }
    });
    
    // 수정 모드에서 blacklist_reason 제외 (서버 스키마에 없음)
    if (isEdit.value) {
      delete submitData.grant;
    }
    
    emit('submit', submitData);
  } catch (error) {
    console.error('Submit error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 삭제 처리
const handleDelete = async () => {
  if (!confirm(`정말로 ${form.value.name}님을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
    return;
  }
  
  try {
    isSubmitting.value = true;
    emit('delete', props.member);
  } catch (error) {
    console.error('Delete error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// 멤버 데이터가 변경될 때 폼 초기화
watch(() => props.member, () => {
  if (props.member) {
    initializeForm();
  } else {
    resetForm();
  }
}, { immediate: true });

// 이미지 에러 처리: DOM 조작 대신 반응형 상태로 대체 이미지 표시
const onProfileImageError = () => {
  if (form.value && form.value.profile_image_url) {
    form.value.profile_image_url = '';
  }
};

// 이미지 업로드 (신규 스토리지 API)
const fileInputRef = ref(null);
const isUploadingImage = ref(false);

const triggerProfileImageSelect = () => {
  if (isEdit.value && !canModifyEntireMember()) return;
  fileInputRef.value?.click();
};

const onProfileImageFileChange = async (event) => {
  const files = event.target?.files;
  const file = files && files[0] ? files[0] : null;
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', 'member');

  try {
    isUploadingImage.value = true;
    const response = await $fetch('/storage/image/upload', {
      baseURL: API_BASE_URL,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    // 표준화된 공개 이미지 URL 우선순위: publicCdnUrl -> publicEmbedUrl -> publicEmbedUrlAlt -> (id 기반 폴백)
    const fileId = response?.id;
    const uploadedUrl =
      response?.publicCdnUrl ||
      response?.publicEmbedUrl ||
      response?.publicEmbedUrlAlt ||
      (fileId ? `https://lh3.googleusercontent.com/d/${fileId}=s512-c` : '');
    if (uploadedUrl) {
      form.value.profile_image_url = uploadedUrl;
    }
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    if (typeof window !== 'undefined' && window.alert) {
      alert('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  } finally {
    isUploadingImage.value = false;
    // 동일 파일 다시 선택 가능하도록 초기화
    if (event.target) {
      event.target.value = '';
    }
  }
};
</script>