const baseUrl = "https://62ab2d92bd0e5d29af09f19a.mockapi.io/User";

// Get API
function apiGetUsers(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {
      name: search,
    },
  });
}

// POST API thêm user
function apiAddUser(user) {
  return axios({
    url: baseUrl,
    data: user,
    method: "POST",
  });
}

// DELETE user
function apiDeleteUser(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "DELETE",
  });
}

// Get User để cập nhật
function apiGetUserToUpdate(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "GET",
  });
}

// API cập nhật
function apiUpdateUser(user) {
  return axios({
    url: `${baseUrl}/${user.id}`,
    data: user,
    method: "PUT",
  });
}
