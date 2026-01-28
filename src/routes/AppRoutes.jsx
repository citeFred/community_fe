import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* 새로운 페이지가 생기면 아래에 Route를 추가 */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;