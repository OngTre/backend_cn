import axios from "axios";


export const api = axios.create({
	baseURL: "http://localhost:8080/api/quizzes"
})

   export const login = async (email, password) =>{
      try {
        const response = await api.post(`/auth/login`, {email, password})
        return response.data;
      } catch (error) {
        console.error(error)
      }     
    
    }

    export const register = async(userData) => {
      try {
        const response = await api.post(`/auth/register`, userData, 
          // {
          //   headers: {Authorization: `Bearer ${token}`}
          // })
          
        )
          return response.data;
      } catch (error) {
        console.error(error)
      }
    
    }




    // utils/UserService.js
  //   export const register = async (formData) => {
  //     try {
  //         console.log('Sending registration data:', formData);
          
  //         const response = await fetch('http://localhost:8080/auth/register', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //                 name: formData.name,
  //                 email: formData.email,
  //                 password: formData.password,
  //                 address: formData.address,
  //                 role: formData.role
  //             })
  //         });
  
  //         const data = await response.json();
  //         console.log('Server response:', data);
  
  //         if (data.statusCode === 200) {
  //             return data;
  //         } else {
  //             throw new Error(data.error || 'Registration failed');
  //         }
  //     } catch (error) {
  //         console.error('Registration error:', error);
  //         throw error;
  //     }
  // };

    export const  getAllUsers = async(token) =>{
        try {
          const response = await api.get(`/admin/get-all-users`, 
            {
              headers: {Authorization: `Bearer ${token}`}  
            })
            return response.data;
    
        } catch (error) {
          console.error(error)
        }
    }


    export const getYourProfile = async(token) =>{
    try {
      const response = await api.get(`/adminuser/get-profile`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return response.data;
    }  catch (error) {
      if (error.response) {
          // Request made and server responded with a status code not in the range of 2xx
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
      } else if (error.request) {
          // Request made but no response received
          console.error('Error request:', error.request);
      } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
      }
      throw error;
  }     
 
    }

    export const getUserById = async(userId, token) =>{
      try {
        const response = await api.get(`/admin/get-users/${userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          return response.data;
      } catch (error) {
        console.error(error)
      }
  
    }

    export const deleteUser = async(userId, token)=>{
      try {
        const response = await api.delete(`/admin/delete/${userId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          
          return response.data;

      } catch (error) {
        console.error(error)
      }
    }


    export const  updateUser = async(userId, userData, token) =>{
      try {
        const response = await api.put(`/admin/update/${userId}`, userData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          return response.data;
      } catch (error) {
        console.error(error)
        
      }
    }

    /**AUTHENTICATION CHECKER */
    export const logout = () => {
      // Kiểm tra nếu không có thông tin đăng nhập trong localStorage
      if (!localStorage.getItem('token') || !localStorage.getItem('role')) {
          alert("Không có thông tin đăng nhập để đăng xuất!");
          return; // Kết thúc hàm nếu không có thông tin đăng nhập
      }
  
      // Hỏi người dùng có chắc chắn muốn đăng xuất không
      const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (confirmLogout) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          alert("Đăng xuất thành công!");
          // Điều hướng về trang đăng nhập hoặc trang chính
          window.location.href = '/login'; // thay đổi đường dẫn nếu cần
      }
  };

    export const isAuthenticated = () =>{
        const token = localStorage.getItem('token')
        return !!token
    }

    export const isAdmin =() =>{
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    export const isUser =() =>{
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    export const adminOnly =() =>{
        return isAuthenticated() && isAdmin();
    }


