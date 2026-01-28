import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ArticleListPage from '../pages/articles/ArticleListPage';
import BoardListPage from '../pages/boards/BoardListPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* 새로운 페이지가 생기면 아래에 Route를 추가 */}
      <Route path="/boards" element={<BoardListPage />} />
      <Route path="/boards/:boardId/articles" element={<ArticleListPage />} />
    </Routes>
  );
}

export default AppRoutes;