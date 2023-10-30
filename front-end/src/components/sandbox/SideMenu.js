import React, { useState,useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import "./index.css"
import axios from 'axios';
import {
    ApartmentOutlined, AuditOutlined, CheckSquareOutlined,
    CodeOutlined, DatabaseFilled,
    DeleteOutlined, ExclamationCircleOutlined, FileOutlined, PlusSquareOutlined,
    ProfileFilled,
    ScheduleFilled, StopOutlined,
    UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";

const {  Sider } = Layout;

const iconList = {
    "/home":<CodeOutlined />,
    "/user-manage":<UsergroupAddOutlined />,
    "/user-manage/list":<UserOutlined />,
    "/course-manage":<ScheduleFilled />,
    "/course-manage/list":<ProfileFilled />,
    "/course-manage/draft":<DeleteOutlined />,
    "/course-manage/category":<ApartmentOutlined />,
    "/publish-manage":<PlusSquareOutlined />,
    "/publish-manage/unpublish":<ExclamationCircleOutlined />,
    "/publish-manage/publish":<CheckSquareOutlined />,
    "/publish-manage/sunset":<StopOutlined />,
    "/application-audit":<FileOutlined />,
    "/application-audit/audit":<AuditOutlined />,
    "/application-audit/list":<DatabaseFilled />,
}


function getItem(label, key, icon, children, type) {
    if (children && children.length > 0) {
        return {
            label: (
                <Menu.SubMenu key={key} icon={iconList[key] || null} title={label}>
                    {children}
                </Menu.SubMenu>
            ),
        };
    } else {
        return {
            label: (
                <Menu.Item key={key} icon={iconList[key] || null}>
                    {label}
                </Menu.Item>
            ),
        };
    }
}


function SideMenu(props) {

    const [menu,setMenu] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children")
            .then(res => {
                setMenu(res.data)
            })
    },[])

    const checkPagePermisson = (item) => {
        return  item.pagepermisson
    }

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const handleClick = (e) => {
        console.log('click ', e);
        if (e.key === props.location.pathname) {
            return;
        }
        props.history.push(e.key);
    };

    const renderMenu = (menus) => {
        return menus
            .filter((item) => checkPagePermisson(item))
            .map((item) => {
                if (item.children && item.children.length > 0) {
                    const childrenItems = item.children
                        .filter((child) => checkPagePermisson(child))
                        .map((child) => getItem(child.label, child.key).label);
                    return getItem(item.label, item.key, null, childrenItems).label;
                } else {
                    return getItem(item.label, item.key).label;
                }
            });
    };

    const selectedKeys = [props.location.pathname]
    const openkeys = ["/"+props.location.pathname.split("/")[1]]

    return (
        <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
            <div style={{display:"flex",height:"100%",flexDirection:"column"}}>
                <img src={require('../../images/1.png')} alt="photo" className="logo-img"/>
                <div className="logo" >CSEE GTA/Grader Application System</div>
                <div style={{flex:1,overflow:"auto"}}>
                    {
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={selectedKeys}
                            defaultOpenKeys={openkeys}
                            onClick={handleClick}>

                            {renderMenu(menu)}

                        </Menu>
                    }
                </div>
            </div>
        </Sider>
    );
}

export default withRouter(SideMenu)