import React, {useEffect, useRef, useState} from "react";
import Highlighter from 'react-highlight-words';
import {Button, Input, Modal, Space, Table} from 'antd';
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";

const { confirm } = Modal;


export default function UserList() {
    const[datasource,setdatasource] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const addForm = useRef(null);
    const updateForm = useRef(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/users").then((res) => {
            setdatasource(res.data);
        });
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'First Name',
            width: 105,
            dataIndex: 'firstname',
            key: 'firstName',
            fixed: 'left',
            ...getColumnSearchProps('firstname'),
        },
        {
            title: 'Surname',
            width: 105,
            dataIndex: 'surname',
            key: 'surName',
            fixed: 'left',
            ...getColumnSearchProps('surname'),
        },
        {
            title: 'Current Level(BS/MS/PhD)',
            dataIndex: 'currentlevel',
            key: '1',
            width: 210,
            filters: [
                {
                    text: 'BS',
                    value: 'BS',
                },
                {
                    text: 'MS',
                    value: 'MS',
                },
                {
                    text: 'PhD',
                    value: 'PhD',
                },
            ],
            onFilter: (value, record) => record.currentlevel.indexOf(value) === 0,
        },
        {
            title: 'Graduating Semester',
            dataIndex: 'semester',
            key: '2',
            width: 175,
            sorter: {
                compare: (a, b) => a.semester - b.semester,
            },
        },
        {
            title: 'Current Major(CS/IT/ECE/EE)',
            dataIndex: 'major',
            key: '3',
            width: 230,
            filters:[
                {
                    text:'CS',
                    value:'CS'
                },
                {
                    text:'IT',
                    value:'IT'
                },
                {
                    text:'ECE',
                    value:'ECE'
                },
                {
                    text:'EE',
                    value:'EE'
                },
            ],
            onFilter: (value, record) => record.major.indexOf(value) === 0,
        },
        {
            title: 'UMKC Email',
            dataIndex: 'email',
            key: '4',
            width: 180,
            ...getColumnSearchProps('email'),
        },
        {
            title:'Student ID',
            dataIndex:'studentId',
            key:'5',
            width:150,
            ...getColumnSearchProps('studentId'),
        },
        {
            title:'Password',
            dataIndex:'password',
            key:'6',
            width:140,
        },
        {
            title: 'Operation',
            key: 'operation',
            fixed: 'right',
            width: 105,
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />}
                    onClick={()=>confirmMethod(item)}/>
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}
                        onClick={()=>handleUpdate(item)}/>
                </div>
            }
        },
    ];

    const confirmMethod = (item) => {
        confirm({
            title: 'Do you Want to delete the user?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteMethod =(item) => {
        setdatasource(datasource.filter((data) => data.id !== item.id));
        axios.delete(`http://localhost:8000/users/${item.id}`)
    }

    const addFormOK = () => {
        addForm.current.validateFields().then(value=> {
            setIsModalOpen(false)
            addForm.current.resetFields()
            axios.post("http://localhost:8000/users", {
                ...value,
            }).then(res=>{
                console.log(res.data)
                setdatasource([...datasource,res.data])
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleOk = () => {
        addFormOK()
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = (item) => {
        setIsUpdateOpen(true)
        setTimeout(()=>{
            updateForm.current.setFieldsValue(item)
        },0)
        setCurrent(item)
    }

    const updateFormOK = () => {
        updateForm.current.validateFields().then(value=> {
            setIsUpdateOpen(false)
            setdatasource(datasource.map(item=>{
                if(item.id===current.id){
                    return {
                        ...item,
                        ...value
                    }
                }
                return item
            }))
        })
    }

    const updateCancel = () => {
        setIsUpdateOpen(false)
    }

    return (
        <div>
            <Button type="primary"  onClick={()=>{
                setIsModalOpen(true)
            }}>Add User</Button>
            <Table
                columns={columns}
                dataSource={datasource}
                scroll={{
                    x: 1500,
                    y: 500,
                }}
            />
            <Modal title="Add User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                okText="Submit" cancelText="Cancel">
                <UserForm ref={addForm}></UserForm>
            </Modal>

            <Modal title="Edit User" open={isUpdateOpen} onOk={updateFormOK} onCancel={updateCancel}
                   okText="Update" cancelText="Cancel">
                <UserForm ref={updateForm}></UserForm>
            </Modal>
        </div>
    )
}