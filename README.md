# 🧘‍♀️ Health Aging Coach

> “Empowering healthier aging through technology”  
> 건강한 노화를 위한 개인 맞춤형 코치 플랫폼

---

## 📖 개요

**Health Aging Coach (HAC)** 는 노화 과정에서 건강 유지와 삶의 질 향상을 돕기 위해 설계된 웹 애플리케이션입니다.  
주요 기술 스택은 **Next.js + TypeScript + Tailwind CSS**이며, 직관적이고 반응형 UI를 제공합니다.

---

## ✨ 주요 기능

- 👤 **사용자 관리**: 로그인, 프로필 등록 및 편집  
- 📊 **건강 데이터 시각화**: 활동량, 수면, 영양 등 주요 지표 추적  
- 💬 **맞춤형 코칭**: 나이 및 건강 상태에 따른 개인화된 코칭 콘텐츠 제공  
- ⏰ **리마인더 및 알림**: 주기적인 건강 관리 알림  
- 📈 **대시보드 요약**: 건강 상태 변화 및 추세 한눈에 확인  

> ⚠️ 현재 초기 버전이므로 일부 기능은 프로토타입 단계입니다.

---

## 🧱 기술 스택

| Category | Technology |
|----------|------------|
| Framework | Next.js |
| Language  | TypeScript |
| Styling   | Tailwind CSS |
| Tools     | ESLint, Prettier, PostCSS |
| VCS       | Git & GitHub |

### 📂 폴더 구조 예시

health_aging_coach/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ └── utils/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

---

## 🚀 시작하기

### 1️⃣ 저장소 클론
```bash
git clone https://github.com/swims0606/health_aging_coach.git
cd health_aging_coach
### 2️⃣ 의존성 설치

```bash
npm install
```

또는

```bash
yarn
```

---

### 3️⃣ 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

### 4️⃣ 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 🧩 사용 방법

1. **로그인** 또는 **회원 등록**  
2. 개인 **프로필 설정**  
3. **활동량, 수면 시간 등** 건강 지표 입력  
4. **대시보드**에서 변화 추세 확인  
5. **코칭 콘텐츠 탭**에서 개인화된 건강 가이드 열람  
6. **리마인더 기능**으로 건강 관리 습관 유지  

---

## 🧪 테스트 (예정)

현재 기본 테스트 설정은 포함되어 있지 않습니다.  
추후 **Jest** 및 **React Testing Library** 기반 테스트 코드가 추가될 예정입니다.

---

## 🔮 향후 개발 계획

- 백엔드 API 연동 및 사용자 인증 강화  
- 머신러닝 기반 건강 예측 모델 통합  
- PWA(Progressive Web App) 버전 개발  
- 다국어(i18n) 및 접근성 개선  
- 사용자 피드백 기반 UI/UX 개선  

---

## 🤝 기여 방법

1. 저장소를 **Fork**  
2. 새로운 브랜치 생성  

```bash
git checkout -b feature/your-feature-name
```

3. 변경사항 커밋  

```bash
git commit -m "Add new feature"
```

4. 푸시 후 Pull Request 생성  
5. 코드 리뷰 및 병합 대기  

> 💡 커밋 전 코드 포맷팅(Prettier)과 타입 검사(TypeScript) 실행을 권장합니다.

---

## 📜 라이선스

이 프로젝트는 **MIT License**에 따라 배포됩니다.  
자세한 내용은 [`LICENSE`](./LICENSE) 파일을 참조하세요.
