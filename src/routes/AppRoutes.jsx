import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import BoardListPage from "../pages/boards/BoardListPage";
import AdminPage from "../pages/admin/AdminPage";
import BoardManagementPage from "../pages/admin/board-management/BoardManagementPage";
import BoardCreatePage from "../pages/admin/board-management/BoardCreatePage";

function AppRoutes() {
    return (
        <Routes>
            {/* home */}
            <Route path="/" element={<HomePage />} />

            {/* admin */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/boards" element={<BoardManagementPage />} />
            <Route path="/admin/boards/create" element={<BoardCreatePage />} />
            
            <Route path="/boards" element={<BoardListPage />} />
        </Routes>
    )
}

export default AppRoutes;