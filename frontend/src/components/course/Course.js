import React from "react";
import "./Course.css";
import { Button, Table, Form, Input } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Course(props) {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [course, setcourse] = useState([]);
  const [load, setload] = useState(true);
  const [deleterow,setdeleterow] = useState(true);
  const [post,setpost]=useState(false);
  const navigate=useNavigate()
  // useEffect(() => {
  //   const s = async () => {
  //     const d = await axios.post(`${process.env.REACT_APP_BACKENDURL}/course`, {
  //       user: props.user,
  //     });
  //   };
  // }, []);

  const fun = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKENDURL}/course`
      );

      const data = await response.json();
      console.log(data.data);
      setcourse(data.data);
      // console.log(course);
      // console.log("datarecievie");
    } catch (err) {
      console.log(err);
    }
  };
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fun();
  }, []);
  useEffect(()=>{
    if(success){
      navigate("/course")
      console.log("yes call")
    }
  },[success])
  useEffect(() => {
    console.log("UPDATED COURS", course);
    if (course != []) {
      setload(false);
      const data = [];
      for (let index = 0; index < course.length; index++) {
        data.push({
          // key: `${index}`,
          no: `${course[index].no}`,
          courseid: `${course[index].courseid}`,
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
          return (
            <Form.Item
              name="no"
          
            ></Form.Item>
          );
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
                setEditingRow(record.no);
                form.setFieldsValue({
                  no: record.no,
                  courseid: record.courseid,
                  coursename: record.coursename,
                  coursetype: record.coursetype,
                  instructor: record.instructor,
                  credit: record.credit,
                });
              }}
            >
              Edit
            </EditOutlined>
            <DeleteOutlined
              onClick={() => {
                // setdeleterow(record.key)
                deleteStudents((record.no));
              }}
              style={{ color: "red", marginLeft: "12px" }}
            />
            <Button type="link" htmlType="submit" onClick={handleSubmit}>
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const handleSubmit = async () => {
    // console.log("me");
    // console.log(dataSource)
    // try {
    //   const url = `${process.env.REACT_APP_BACKENDURL}/course`;
    //   const d = await axios.post(url, dataSource);
    //   console.log("meto");
    //   console.log(d);
    // } catch (error) {
    //   console.log("ref eroor");
    // }
    if(post===true){
      setpost(false)
    }else{
      setpost(true);
    }
  };
  
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
    try {
      const s = async () => {
        var tem=dataSource;
        var l=1;
        function file1(item){
          item["no"]=l;
          l=l+1;
        } 
         tem.forEach(file1);
         setDataSource(tem);
        function file2(item){
          item["semester"]=1;
        } 
         tem.forEach(file2);
        const url=`${process.env.REACT_APP_BACKENDURL}/course`;
            const d = await axios.post(url, {
              data:tem,
              user:props.user
            });
          };
        s();
        console.log("datasource updated",props.user)
        console.log("datasource0",dataSource)
        
    } catch (error) {
      console.log("error in delete document")
    }
    
  }, [post]);
  
  const deleteStudents = (record) => {
    console.log(typeof(record.toString()),"key")
    const ff=dataSource.filter((student) => student.no !== record);
    setDataSource(ff);
    console.log("Hello");
    console.log(dataSource)
    if(post===true){
      setpost(false)
    }else{
      setpost(true);
    }
  };
  return (
    <div className="w-100 d-flex justify-content-center">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>

          <Table columns={columns} dataSource={dataSource} rowKey="no"></Table>
          <Button onClick={addnewstudents}>Add new course</Button>
        </Form>
      </header>
    </div>
  );
}
