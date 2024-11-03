import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {register} from '../../utils/UserService';
import '../../index.css'
function RegistrationPage() {
    const navigate = useNavigate();
     //const [token, setToken] = useState(''); // Đảm bảo bạn có cách để lấy token
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: ''
        
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form (GET request)
        try {
            const token = localStorage.getItem('token');
            await register(formData, token); // Gọi hàm register với dữ liệu và token
    
            // Reset form sau khi đăng ký thành công
            setFormData({
                name: '',
                email: '',
                password: '',
                address: '',
                role: '',
            });
    
            alert('Đăng ký người dùng thành công');
            navigate('/login'); // Chuyển hướng sau khi đăng ký
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Lỗi đăng ký');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your Name" required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your Email" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" required />
                </div>

                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
                </div>
               
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
