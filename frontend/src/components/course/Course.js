import React from 'react'
import './Course.css'
import { Button, Table, Form, Input } from "antd";
import "antd/dist/antd.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
export default function Course(props) {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [course, setcourse] = useState([]);
   useEffect(()=>{
     const s=async()=>{
 const d=await axios.post( `${process.env.REACT_APP_BACKENDURL}/course`,{user:props.user});
     }
   },[])
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKENDURL}/course`
        );
        const data = await response.json();
         setcourse(data.data);
        console.log(course)
        console.log("datarecievie");
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  },[]);
  useEffect(() => {
    const data = [];
    // const l=course.length
    for (let index = 0; index <course.length; index++) {
      data.push({
        key: `${index}`,
        no: `${course[index].key}`,
        courseid: `${course[index].courseid}`,
        coursename: `${course[index].coursename}`,
        coursetype: `${course[index].coursetype}`,
        instructor: `${course[index].instructor}`,
        credit: `${course[index].credit}`,
      });
    }
    setDataSource(data);
  },[]);
  const columns = [
    {
      title: "NO",
      dataIndex: "no",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="no"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
            </Form.Item>
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
        if (editingRow === record.key) {
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
        if (editingRow === record.key) {
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
        if (editingRow === record.key) {
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
        if (editingRow === record.key) {
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
        if (editingRow === record.key) {
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
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  no:record.no,
                  courseid: record.courseid,
                  coursename: record.coursename,
                  coursetype:record.coursetype,
                  instructor:record.instructor,
                  credit:record.credit,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const handleSubmit=async()=>{
    console.log("me")
    try {
      const url=`${process.env.REACT_APP_BACKENDURL}/course`;
      const d=await axios.post(url,dataSource);
      console.log("meto");
      console.log(d);
    } catch (error) {
      console.log("ref eroor")
    }
  }
  const onFinish = async (values) => {
    
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow,1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
    console.log("me")
    handleSubmit();
  };
  
  return (
    <div className="w-100 d-flex justify-content-center">
      <header className="App-header">
        <Form form={form} onFinish={onFinish} >
          <Table columns={columns} dataSource={dataSource} rowKey="key"></Table>
        </Form>
      </header>
    </div>
  );
}