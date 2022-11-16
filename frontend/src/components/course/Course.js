import React from "react";
import "./Course.css";
import { Button, Table, Form, Input, Modal } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Course() {
  const [login,setlogin]=useState(true)
  const notify = () => toast.success(`${props.loginmsg}`,{
    position:"top-center",
    autoClose:3000,
    theme:"colored"
  });
  useEffect(()=>{
    if(login){

      notify();
    }
    setlogin(false)
  },[])

  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [course, setcourse] = useState([]);
  const [load, setload] = useState(false);
  const [deleterow, setdeleterow] = useState(true);
  const [post, setpost] = useState(false);
  const navigate = useNavigate();
  const [semester,setsemester]=useState(1);
  const props={};
  let luser = window.localStorage.getItem("loginuser");
  if(luser !== null) props.user = luser
  else navigate("/login")
  const fun = async () => {
    try {
      console.log(props.user,"user in data fetch")
      const url=`${process.env.REACT_APP_BACKENDURL}/course`;
      const response =await axios.post(url,{
        user:props.user,
        type:"get"
      })
      console.log("data",response.data.data)
      setcourse(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fun();
  }, []);
  useEffect(() => {
    if (success) {
      navigate("/course");
    }
  }, [success]);
  useEffect(() => {
    console.log("UPDATED COURS", course);
    if (course != []) {
      setload(false);
      const data = [];
      for (let index = 0; index < course.length; index++) {
        data.push({
          no: `${course[index].no}`,
          courseid: `${course[index].courseid}`,
          semester: `${course[index].semester}`,
          coursename: `${course[index].coursename}`,
          coursetype: `${course[index].coursetype}`,
          instructor: `${course[index].instructor}`,
          credit: `${course[index].credit}`,
        });
      }
      setDataSource(data);
    }
  }, [course]);

  const columns = [
    {
      title: "NO",
      dataIndex: "no",
      render: (text, record) => {
        if (editingRow === record.no) {
          return <Form.Item name="no"></Form.Item>;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "courseid",
      dataIndex: "courseid",
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item
              name="courseid"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "semester",
      dataIndex: "semester",
      filteredValue:[(semester.toString())],
      onFilter:(value,record)=>{
        return (record.semester.includes(value))
      },
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item
              name="semester"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "coursename",
      dataIndex: "coursename",
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item name="coursename">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "coursetype",
      dataIndex: "coursetype",
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item name="coursetype">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "instructor",
      dataIndex: "instructor",
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item name="instructor">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "credit",
      dataIndex: "credit",
      render: (text, record) => {
        if (editingRow === record.no) {
          return (
            <Form.Item name="credit">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <EditOutlined
              type="link"
              onClick={() => {
                onEditStudent(record);
              }}
            >
              Edit
            </EditOutlined>
            <DeleteOutlined
              onClick={() => {
                deleteStudents(record.no);
              }}
              style={{ color: "red", marginLeft: "12px" }}
            />
          </>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
    console.log("me");
    // handleSubmit();
  };
  const addnewstudents = () => {
    const newrow = {
      key: `${dataSource.length + 1}`,
      no: `${dataSource.length + 1}`,
      courseid: "",
      coursename: "",
      coursetype: "",
      instructor: "",
      credit: "",
    };
    setDataSource((pre) => {
      return [...pre, newrow];
    });
  };

  useEffect(() => {
    if(load){
    try {
      const s = async () => {
        var tem = dataSource;
        var l = 1;
        function file1(item) {
          item["no"] = l;
          l = l + 1;
        }
        tem.forEach(file1);
        setDataSource(tem);
        // function file2(item) {
        //   item["semester"] = 1;
        // }
        // tem.forEach(file2);
        console.log("temp",tem)
        console.log(props.user,"users")
        const url = `${process.env.REACT_APP_BACKENDURL}/course`;
        const d = await axios.post(url, {
          data: tem,
          user: props.user,
          type:"post"
        });
      };
      s();
      console.log("datasource updated", props.user);
      console.log("datasource0", dataSource);
    } catch (error) {
      console.log("error in delete document");
    }
  }
    
  }, [post]);

   
  const deleteStudents = (record) => {
    console.log(typeof record.toString(), "key");
    const ff = dataSource.filter((student) => student.no !== record);
    setDataSource(ff);
    console.log("Hello");
    console.log(dataSource);
    setload(true)
  console.log(load,"load")
    if (post === true) {
      setpost(false);
    } else {
      setpost(true);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
    console.log("her", editingRow);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  const semesterchange =(x)=>{
    if(x=="d" && semester>1){
      setsemester(semester-1)
    }
    if(x=="i" && semester<8){
      setsemester(semester+1)
    }
    console.log("semester " ,semester)
  }
  return (
    <>
    <div className="w-100 d-flex justify-content-center">

      <ToastContainer/>
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource} rowKey="no"></Table>
          <Button onClick={addnewstudents}>Add new course</Button>
          <Modal
            title="Edit course"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setDataSource((pre) => {
                return pre.map((student) => {
                  console.log(editingStudent.key);
                  if (student.no === editingStudent.no) {
                    return editingStudent;
                  } else {
                    return student;
                  }
                });
              });
              if (post === true) {
                setpost(false);
              } else {
                setpost(true);
              }
              setload(true)
              console.log(load,"load")
              resetEditing();
            }}
          >
            <Input
              value={editingStudent?.courseid}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, courseid: e.target.value };
                });
              }}
              addonBefore="courseid"
            />
            <Input
              value={editingStudent?.semester}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, semester: e.target.value };
                });
              }}
              addonBefore="semester"
            />
            <Input style={{marginTop:"5px"}}
              value={editingStudent?.coursename}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, coursename: e.target.value };
                });
              }}
              addonBefore="credit"
            />
            <Input style={{marginTop:"5px"}}
              value={editingStudent?.coursetype}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, coursetype: e.target.value };
                });
              }}
              addonBefore="credit"
            />
            <Input style={{marginTop:"5px"}}
              value={editingStudent?.instructor}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, instructor: e.target.value };
                });
              }}
              addonBefore="instructor"
            />
            <Input style={{marginTop:"5px"}}
              value={editingStudent?.credit}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, credit: e.target.value };
                });
              }}
              addonBefore="credit"
            />
          </Modal>
        </Form>
      </header>
    </div>
    <div className="row mt-5 " style={{width:"80%"}}>
      <div className="col d-flex justify-content-center"><button className="btn btn-success" onClick={()=>{semesterchange("d")}}>pre sem</button></div>
      <div className="col d-flex justify-content-center"><button className="btn btn-success" onClick={()=>{semesterchange("i")}}>next sem</button></div>
    </div>
    </>
  );
}
