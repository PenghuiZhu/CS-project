import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Input, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import DraftForm from "../../../components/course-manage/DraftForm";

const { confirm } = Modal;

export default function Draft(){
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
        axios.get("http://localhost:8000/drafts").then((res) => {
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
            title: 'Course Number',
            width: 105,
            dataIndex: 'draftcoursenumber',
            key: 'draftcoursenumber',
            fixed: 'left',
            ...getColumnSearchProps('draftcoursenumber'),
        },
        {
            title: 'Course Name',
            width: 105,
            dataIndex: 'draftcoursename',
            key: 'draftcoursename',
            fixed: 'left',
            ...getColumnSearchProps('draftcoursename'),
        },
        {
            title: 'Need',
            dataIndex: 'draftneed',
            key: '1',
            width: 210,
            filters: [
                {
                    text: 'graders',
                    value: 'graders',
                },
                {
                    text: 'instructor positions',
                    value: 'instructor positions',
                },
                {
                    text: 'lab instructors',
                    value: 'lab instructors',
                },
            ],
            onFilter: (value, record) => record.currentlevel.indexOf(value) === 0,
        },
        {
            title: 'Descriptions',
            dataIndex: 'draftdescription',
            key: '2',
            width: 175,
            ...getColumnSearchProps('draftdescription'),
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
            title: 'Do you Want to delete the draft?',
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
            }}>Add Draft</Button>
            <Table
                columns={columns}
                dataSource={datasource}
                scroll={{
                    x: 1500,
                    y: 500,
                }}
            />
            <Modal title="Add Draft" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   okText="Submit" cancelText="Cancel">
                <DraftForm ref={addForm}></DraftForm>
            </Modal>

            <Modal title="Edit Draft" open={isUpdateOpen} onOk={updateFormOK} onCancel={updateCancel}
                   okText="Update" cancelText="Cancel">
                <DraftForm ref={updateForm}></DraftForm>
            </Modal>
        </div>
    )
}