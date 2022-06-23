async function validation() {
  let isValid = true;
  const waitFunction = await handleAccountValidation();
  // Account
  if (!waitFunction) {
    isValid = false;
  }
  // Name
  if (!handleNameValidation()) {
    isValid = false;
  }

  // Password
  if (!handlePasswordValidation()) {
    isValid = false;
  }

  // Email
  if (!handleEmailValidation()) {
    isValid = false;
  }

  // Image
  if (!handleImageValidation()) {
    isValid = false;
  }

  // Type
  if (!handleTypeValidation()) {
    isValid = false;
  }

  // Language
  if (!handleLanguageValidation()) {
    isValid = false;
  }

  // Describe
  if (!handleDescribeValidation()) {
    isValid = false;
  }

  return isValid;
}

// Account
document
  .getElementById("TaiKhoan")
  .addEventListener("change", handleAccountValidation);
async function handleAccountValidation() {
  const account = document.getElementById("TaiKhoan").value;
  const divAccount = document.getElementById("divAccount");
  // Validation trùng account

  const userData = apiGetUsers().then((result) => {
    const users = result.data;
    return users;
  });

  const users = await userData;

  const accounts = users.findIndex((user) => {
    return user.account === account;
  });

  if (accounts !== -1) {
    divAccount.innerHTML = "Tài khoản đã tồn tại";
    return false;
  } else if (!isRequired(account)) {
    divAccount.innerHTML = "Tài khoản không được để trống";
    return false;
  } else {
    divAccount.innerHTML = "";
    return true;
  }
}

// Name
document
  .getElementById("HoTen")
  .addEventListener("change", handleNameValidation);
function handleNameValidation() {
  // DOM
  const name = document.getElementById("HoTen").value;
  // Logic
  var letterName =
    /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
  var checkName = letterName.test(name);

  if (!isRequired(name)) {
    divName.innerHTML = "Họ tên không được để trống";
    return false;
  } else if (!checkName) {
    divName.innerHTML = "Họ tên không được chứa số và kí tự đặc biệt";
    return false;
  } else {
    divName.innerHTML = "";
  }
  return true;
}

// Password
document
  .getElementById("MatKhau")
  .addEventListener("change", handlePasswordValidation);
function handlePasswordValidation() {
  const password = document.getElementById("MatKhau").value;
  const divPassword = document.getElementById("divPassword");
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
  const checkPassword = passwordRegex.test(password);
  if (!isRequired(password)) {
    divPassword.innerHTML = "Mật khẩu không được để trống";
    return false;
  } else if (password.length < 6 || password.length > 8) {
    divPassword.innerHTML = "Mật khẩu phải có độ dài từ 6-8 kí tự";
    return false;
  } else if (!checkPassword) {
    divPassword.innerHTML =
      "Mật khẩu phải chứa ít nhất 1 kí tự hoa, 1 kí tự đặc biệt và 1 kí tự số";
    return false;
  } else {
    divPassword.innerHTML = "";
  }
  return true;
}

// Email
document
  .getElementById("Email")
  .addEventListener("change", handleEmailValidation);
function handleEmailValidation() {
  const email = document.getElementById("Email").value;
  const divEmail = document.getElementById("divEmail");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailCheck = emailRegex.test(email);

  if (!isRequired(email)) {
    divEmail.innerHTML = "Email không được để trống";
    return false;
  } else if (!emailCheck) {
    divEmail.innerHTML = "Email không đúng định dạng";
    return false;
  } else {
    divEmail.innerHTML = "";
  }
  return true;
}

// Image
function handleImageValidation() {
  const image = document.getElementById("HinhAnh").value;
  const divImage = document.getElementById("divImage");

  if (!isRequired(image)) {
    divImage.innerHTML = "Ảnh không được để trống";
    return false;
  } else {
    divImage.innerHTML = "";
  }
  return true;
}

// Type
function handleTypeValidation() {
  const type = document.getElementById("loaiNguoiDung").value;
  const divType = document.getElementById("divType");
  if (!isRequired(type)) {
    divType.innerHTML = "Bạn chưa chọn giá trị";
    return false;
  } else {
    divType.innerHTML = "";
  }
  return true;
}

// Language
function handleLanguageValidation() {
  const language = document.getElementById("loaiNgonNgu").value;
  const divLanguage = document.getElementById("divLanguage");
  if (!isRequired(language)) {
    divLanguage.innerHTML = "Bạn chưa chọn giá trị";
    return false;
  } else {
    divLanguage.innerHTML = "";
  }
  return true;
}

// Describe
document
  .getElementById("MoTa")
  .addEventListener("change", handleDescribeValidation);
function handleDescribeValidation() {
  const describe = document.getElementById("MoTa").value;
  const divDescribe = document.getElementById("divDescribe");
  if (!isRequired(describe)) {
    divDescribe.innerHTML = "Bạn chưa nhập mô tả";
    return false;
  } else if (describe.length > 60) {
    divDescribe.innerHTML = "Bạn đã nhập quá 60 kí tự";
  } else {
    divDescribe.innerHTML = "";
  }
  return true;
}

// Hàm bắt buộc nhập không được để trống
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}

// Validation Update
function updateValidation() {
  let isValid = true;
  // Name
  if (!handleNameValidation()) {
    isValid = false;
  }

  // Password
  if (!handlePasswordValidation()) {
    isValid = false;
  }

  // Email
  if (!handleEmailValidation()) {
    isValid = false;
  }

  // Image
  if (!handleImageValidation()) {
    isValid = false;
  }

  // Type
  if (!handleTypeValidation()) {
    isValid = false;
  }

  // Language
  if (!handleLanguageValidation()) {
    isValid = false;
  }

  // Describe
  if (!handleDescribeValidation()) {
    isValid = false;
  }

  return isValid;
}
