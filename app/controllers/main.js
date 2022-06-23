// ======= Hàm tiện ích =========
// Hàm main sẽ là hàm callAPI và render ra giao diện
main();
function main() {
  //   Call API
  apiGetUsers().then((result) => {
    const users = result.data;
    users.forEach((user) => {
      user = new Users(
        user.id,
        user.account,
        user.password,
        user.name,
        user.email,
        user.language,
        user.type
      );
    });
    display(users);
  });
}

// Hàm render giao diện

function display(users) {
  // Lặp
  const htmls = users.map((user) => {
    return `
        <tr>
        <td>${user.id}</td>
        <td>${user.account}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.language}</td>
        <td>${user.type}</td>
        <td>
        <button class="btn btn-success" 
        data-toggle="modal" 
        data-target="#myModal" onclick="showUpdateModal(${user.id})">Cập nhật</button>
        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
        </td>
        </tr>
        `;
  });

  //   DOM
  document.getElementById("tblDanhSachNguoiDung").innerHTML = htmls.join("");
}

// Reset Form
function resetForm() {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("MoTa").value = "";

  document.getElementById("divAccount").innerHTML = "";
  document.getElementById("divName").innerHTML = "";
  document.getElementById("divPassword").innerHTML = "";
  document.getElementById("divEmail").innerHTML = "";
  document.getElementById("divImage").innerHTML = "";
  document.getElementById("divType").innerHTML = "";
  document.getElementById("divLanguage").innerHTML = "";
  document.getElementById("divDescribe").innerHTML = "";

  document.getElementById("TaiKhoan").disabled = false;

  // Đóng modal
  $("#myModal").modal("hide");
}

// ======= Các hàm xử lý sự kiện ======
// Hàm thêm user
async function addUser() {
  // DOM
  const account = document.getElementById("TaiKhoan").value;
  const name = document.getElementById("HoTen").value;
  const password = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const image = document.getElementById("HinhAnh").value;
  const type = document.getElementById("loaiNguoiDung").value;
  const language = document.getElementById("loaiNgonNgu").value;
  const describe = document.getElementById("MoTa").value;

  const isValid = await validation();
  if (!isValid) {
    return;
  }

  //   Khởi tạo đối tượng

  const user = new Users(
    null,
    account,
    name,
    password,
    email,
    type,
    language,
    describe,
    image
  );

  // POST lên server
  apiAddUser(user).then((result) => {
    main();
    resetForm();
    teacherFilter();
  });
}

// Xóa user
function deleteUser(userId) {
  apiDeleteUser(userId).then((result) => {
    // Xoa thanh cong
    main();
  });
}

// Cập nhật user
function updateUser() {
  // DOM
  const id = document.getElementById("maUser").value;
  const account = document.getElementById("TaiKhoan").value;
  const name = document.getElementById("HoTen").value;
  const password = document.getElementById("MatKhau").value;
  const email = document.getElementById("Email").value;
  const image = document.getElementById("HinhAnh").value;
  const type = document.getElementById("loaiNguoiDung").value;
  const language = document.getElementById("loaiNgonNgu").value;
  const describe = document.getElementById("MoTa").value;

  // Check validation
  const isValid = updateValidation();
  if (!isValid) {
    return;
  }
  //   Khởi tạo đối tượng

  const user = new Users(
    id,
    account,
    name,
    password,
    email,
    type,
    language,
    describe,
    image
  );

  // Call API update
  apiUpdateUser(user)
    .then((result) => {
      main();
      resetForm();
    })
    .catch((error) => console.log("error", error));
}

// Hàm Search:
document
  .getElementById("text-search")
  .addEventListener("keypress", handleSearch);

function handleSearch(e) {
  if (e.key !== "Enter") {
    return;
  }

  const value = e.target.value;
  apiGetUsers(value).then((result) => {
    const searchUsers = result.data;
    searchUsers.forEach((user) => {
      user = new Users(
        user.id,
        user.account,
        user.password,
        user.name,
        user.email,
        user.language,
        user.type
      );
    });

    display(searchUsers);
  });
}

// Hàm click search
document
  .getElementById("basic-addon2")
  .addEventListener("click", handleClickSearch);
function handleClickSearch(e) {
  const value = document.getElementById("text-search").value;
  apiGetUsers(value).then((result) => {
    const searchUsers = result.data;
    searchUsers.forEach((user) => {
      user = new Users(
        user.id,
        user.account,
        user.password,
        user.name,
        user.email,
        user.language,
        user.type
      );
    });

    display(searchUsers);
  });
}

// ======= Phần này xử lý modal =========
// Thêm người dùng
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  document.querySelector(".modal-title").innerHTML = `Thêm người dùng`;
  document.querySelector(".modal-footer").innerHTML = `
  <button class="btn btn-primary" onclick="addUser()">Thêm</button>
  <button class = 'btn btn-secondary' data-dismiss='modal'>Hủy</button>
  `;

  resetForm();
}

// Cập nhật người dùng
function showUpdateModal(userId) {
  document.querySelector(".modal-title").innerHTML = "Cập nhật người dùng";
  document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-primary" onclick="updateUser()">Cập nhật</button>
  <button class = 'btn btn-secondary' data-dismiss='modal'>Hủy</button>
    `;

  resetForm();

  apiGetUserToUpdate(userId).then((result) => {
    const user = result.data;
    document.getElementById("maUser").value = user.id;
    document.getElementById("TaiKhoan").value = user.account;
    document.getElementById("HoTen").value = user.name;
    document.getElementById("MatKhau").value = user.password;
    document.getElementById("Email").value = user.email;
    document.getElementById("HinhAnh").value = user.image;
    document.getElementById("loaiNguoiDung").value = user.type;
    document.getElementById("loaiNgonNgu").value = user.language;
    document.getElementById("MoTa").value = user.describe;

    // disable account
    document.getElementById("TaiKhoan").disabled = true;
  });
}
