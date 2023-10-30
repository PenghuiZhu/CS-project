import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import {Avatar, Dropdown, Layout} from 'antd';
import React, {useState} from "react";
const { Header} = Layout;

function TopHeader(props) {
    const [collapsed,setCollapsed] = useState(false);
    const changeCollapsed = ()=>{
        setCollapsed(!collapsed);
    }

    const { firstname = '' } = JSON.parse(localStorage.getItem("token")) || {};

    const items = [
        {
            key: '1',
            label: (
                <a>  Account </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: 'SignOut',
            onClick: () => {
                localStorage.removeItem("token")
                props.history.replace("/login")
            },
        },
    ];
    return (
        <Header className="site-layout-background" style={{padding: 0,}}>
            {
                collapsed?<MenuUnfoldOutlined onClick={changeCollapsed}/>:
                    <MenuFoldOutlined onClick={changeCollapsed}/>
            }

            <div style={{float:"right"}}>
                <span>Welcome back, <span style={{color:"#1890ff"}}>{firstname}</span></span>
                <Dropdown menu={{items,}}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

export default withRouter(TopHeader);