import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course-service";

//有登入當前使用者
const CourseComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const hanldeTakeToLogin = () => {
    navigate("/login");
  };

  //搜尋講師id
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourse(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);
  const handleDelete = (_id) => {
    CourseService.deleteCourse(_id).then(() => {
      console.log(_id);
    });
  };

  const handlePatch = () => {
    navigate("/patchcourse");
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={hanldeTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {/* 有當前用戶 且 身分是學生 */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師課程頁面</h1>
        </div>
      )}
      {/* 有當前用戶 且 身分是講師 */}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生課程頁面</h1>
        </div>
      )}

      {/* 有當前用戶 且 有註冊課程 且 至少有註冊一個課程  */}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem ", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數:{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格:{course.price}
                  </p>
                </div>
                {currentUser.user.role == "instructor" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0 ",
                    }}
                  >
                    <button
                      id={course._id}
                      onClick={handleDelete}
                      className="btn btn-outline-danger"
                      style={{
                        borderRadius: "0",
                        fontWeight: "bold",
                        flex: 1,
                        marginRight: "0",
                      }}
                      type="button"
                    >
                      刪除課程
                    </button>
                    <button
                      id={course._id}
                      onClick={handlePatch}
                      className="btn btn-outline-info"
                      style={{ borderRadius: "0", fontWeight: "bold", flex: 1 }}
                      type="button"
                    >
                      修改課程
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      padding: "0 ",
                    }}
                  >
                    <button
                      id={course._id}
                      onClick={handleDelete}
                      className="btn btn-outline-danger"
                      style={{ borderRadius: "0", fontWeight: "bold", flex: 1 }} // 確保按鈕使用 flex: 1 來填滿容器
                      type="button"
                    >
                      刪除課程
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
