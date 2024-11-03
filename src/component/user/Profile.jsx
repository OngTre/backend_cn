import React, { useState, useEffect } from 'react';
import { getYourProfile } from '../../utils/UserService';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
			
        fetchProfileInfo()
    }, []);



    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage     
            const response = await getYourProfile(token);
            if (response) {
                setProfileInfo(response.users); // Set thông tin profile của người dùng đầu tiên từ mảng response
                 console.log(response.users); // Log dữ liệu profile để kiểm tra
            } else {
                console.error('Không tìm thấy dữ liệu người dùng trong userList');
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin profile', error);
        }
    };
    return (
        
        <div className="profile-page-container">
            <h2>Thông tin cá nhân</h2>
            <p>Tên: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>Địa chỉ: {profileInfo.address}</p>
            {profileInfo.role === "ADMIN" &&  (
                <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
            )}
        </div>
    );
}


export default ProfilePage;