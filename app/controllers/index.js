teacherFilter();

function teacherFilter() {
  //  Call API lấy danh sách user
  apiGetUsers().then((result) => {
    const users = result.data;
    const teachers = users.filter((user) => {
      return user.type === "GV";
    });
    teachers.forEach((teacher) => {
      teacher = new Users(
        teacher.id,
        teacher.account,
        teacher.name,
        teacher.password,
        teacher.email,
        teacher.type,
        teacher.language,
        teacher.describe,
        teacher.image
      );
    });

    render(teachers);
  });
}

function render(teachers) {
  // Loop
  const html = teachers.map((teacher) => {
    return `
        <div class="row wow animate__animated animate__fadeIn" data-wow-delay="0.5s">
          <div class="item">
            <div class="avatar">
              <img
                src="../../assets/img/${teacher.image}"
                alt="Photo"
                width="100%"
              />
            </div>
            <div class="describe">
              <h4>${teacher.language}</h4>
              <h1>${teacher.name}</h1>
              <p>${teacher.describe}</p>
            </div>
            <div class="icon">
              <a href="#" class="fa-brands fa-twitter"></a>
              <a href="#" class="fa-brands fa-facebook"></a>
              <a href="#" class="fa-brands fa-youtube"></a>
              <a href="#" class="fa-brands fa-instagram"></a>
            </div>
          </div>
        </div>
        `;
  });
  document.getElementById("teacher-render").innerHTML = html.join("");
}
