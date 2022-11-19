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
export default function Course(props) {
  const [login,setLogin]=useState(true)
  const notify = () => toast.success(`${props.loginmsg}`,{
    position:"top-center",
    autoClose:1000,
  });
  useEffect(()=>{
    console.log("cout",login);
    if(props.lmsg!==""){
      notify();
    }
    setLogin(false)
    props.lmsg("")
    console.log("cout234455667",login);
  },[])
  const puser={};
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [course, setcourse] = useState([]);
  const [load, setload] = useState(false);
  // const [deleterow, setdeleterow] = useState(true);
  const [post, setpost] = useState(false);
  const navigate = useNavigate();
  const [total ,settotal]=useState(0)
  const [semester,setsemester]=useState(1);
  const[errormsg,seterrormsg]=useState("sddcfvghj");
  const [totalcredit,settotalcredit]=useState(0);
  const [totalcourse,settotalcourse]=useState(0);
  const [operation,setoperation]=useState("");
  const semtotal={'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0};
  const [t,sett]=useState(semtotal)
  // const [puser,setpuser]=useState("");
  let luser = window.localStorage.getItem("loginuser");
  if(luser !== null) puser.user = luser
  else navigate("/login")
  const fun = async () => {
    try {
      console.log(puser.user,"user in data fetch")
      const url=`${process.env.REACT_APP_BACKENDURL}/course`;
      const response =await axios.post(url,{
        user:puser.user,
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
      sett({'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0})
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
        var sem=t;
        sem[`${course[index].semester}`]=parseInt(sem[`${course[index].semester}`])+parseInt(course[index].credit);
        sett(sem)
        const values = Object.values(sem);
        settotalcourse(data.length);
        const sum = values.reduce((accumulator, value) => {
          return accumulator + value;
         }, 0);
         settotalcredit(sum)
      }
      if(t['1']<12){
        seterrormsg(`Add More courses to satisfy minimum 12 credit for this semester`)
      }
      setDataSource(data);
      var  temp=t;
      settotal(temp[1])
      console.log(t,"total course")
    }
  }, [course]);

  const columns = [
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
    const s= semester.toString()
    const newrow = {
      key: `${dataSource.length + 1}`,
      no: `${dataSource.length + 1}`,
      semester:s,
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
        const credits=t;
        function file1(item) {
          item["no"] = l;
          l = l + 1;
        }
        tem.forEach(file1);
        var holder = {};

        tem.forEach(function(d) {
          if (holder.hasOwnProperty(d.semester)) {
            holder[((d.semester).toString())] = parseInt(holder[((d.semester).toString())]) + parseInt(d.credit);
          } else {
            holder[((d.semester).toString())] = parseInt(d.credit);
          }
        });
        sett(holder)
        console.log("totalnew",holder)
        setDataSource(tem);
        console.log("temp",tem)
        console.log(puser.user,"users")
        settotalcourse(tem.length);
        const values = Object.values(holder);
        const sum = values.reduce((accumulator, value) => {
          return accumulator + parseInt(value);
         }, 0);
         settotalcredit(sum)
         console.log("sum",sum)
        const url = `${process.env.REACT_APP_BACKENDURL}/course`;
        const d = await axios.post(url, {
          data: tem,
          credit:sum,
          course:tem.length,
          user: puser.user,
          type:"post"
        });
      };
      s();
      console.log("datasource updated", puser.user);
      console.log("datasource0", dataSource);
    } catch (error) {
      console.log("error in delete document");
    }
  }
    
  }, [post]);

   
  const deleteStudents = (record) => {
    Modal.confirm({
      title:'Are you sure, to delete this course',
      okText:'YES',
      okType:"danger",
      onOk:()=>{

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
      }
    })
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
    semtotal[record.semester]=parseInt(semtotal[record.semester])+parseInt(semtotal[record.credit])
    console.log("semtotla",semtotal)
    console.log("her", editingRow);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  
  const semesterchange =(x)=>{
    var  temp=t;
    
    if(x=="d" && semester>1){
      settotal(temp[semester-1])
      setsemester(semester-1)
    }
    if(x=="i" && semester<8){
      settotal(temp[semester+1])
      setsemester(semester+1)
    }
    console.log("semester " ,temp[semester])
   
  }
  return (
    <>
    
    <div ><h2 className="d-flex justify-content-center">Courses of semester  {semester} | total credits {total}</h2></div>
       
    <div className="w-100 d-flex justify-content-center">
      <ToastContainer/>
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource} rowKey="no" pagination={false}></Table>
        <div className="d-flex ">
        <Button onClick={addnewstudents} style={{marginTop:10}}>Add new course</Button>
        <div  className="courseleft h6 mt-3" style={{color:"red",display:`${total>=12?"none":"block"}`}}> &nbsp;&nbsp;&nbsp;&nbsp;<b>Warnings</b> : &nbsp;&nbsp;&nbsp;Add More courses to satisfy minimum (12) credit for this semester</div>
        <div  className="courseleft h6 mt-3" style={{color:"red",display:`${total>=22?"block":"none"}`}}> &nbsp;&nbsp;&nbsp;&nbsp;<b>Warnings</b> : &nbsp;&nbsp;&nbsp;You have exceeded maximum (22) per semester credit limit </div>
        </div>
          
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
            <Input style={{marginTop:"5px"}}
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
              addonBefore="coursename"
            />
            <Input style={{marginTop:"5px"}}
              value={editingStudent?.coursetype}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, coursetype: e.target.value };
                });
              }}
              addonBefore="coursetype"
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
    <div className="row   mt-5 ">
      <div className="col d-flex justify-content-end"><button className="btn btn-success" style={{display:`${semester===1?"none":"block"}`}} onClick={()=>{semesterchange("d")}}> &larr;semester {semester-1}</button></div>
      <div className="col d-flex justify-content-start"><button className="btn btn-success"style={{display:`${semester===8?"none":"block"}`}} onClick={()=>{semesterchange("i")}}>semester {semester+1}&rarr;</button></div>
    </div>
    </>
  );
}
