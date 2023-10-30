import React from "react";
import {HashRouter,Redirect, Route, Switch} from "react-router-dom";
import TopHeader from "../../components/sandbox/TopHeader";
import SideMenu from "../../components/sandbox/SideMenu";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import NoPermission from "./nopermission/NoPermission";
import AuditApplication from "./application-audit/AuditApplication";
import AuditList from "./application-audit/AuditList";
import CourseList from "./course-manage/CourseList";
import Draft from "./course-manage/Draft";
import CourseCategory from "./course-manage/CourseCategory";
import Unpublish from "./publish-manage/Unpublish";
import Publish from "./publish-manage/Publish";
import Sunset from "./publish-manage/Sunset";

import './GTASandBox.css'


import{ Layout } from "antd";
const { Content} = Layout;

export default function GTASandBox() {
    return (
        <HashRouter>
            <Layout>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflow: 'auto'
                        }}
                    >
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/user-manage/list" component={UserList}/>
                            <Route path="/application-audit/audit" component={AuditApplication}/>
                            <Route path="/application-audit/list" component={AuditList}/>
                            <Route path="/course-manage/list" component={CourseList}/>
                            <Route path="/course-manage/draft" component={Draft}/>
                            <Route path="/course-manage/category" component={CourseCategory}/>
                            <Route path="/publish-manage/unpublish" component={Unpublish}/>
                            <Route path="/publish-manage/publish" component={Publish}/>
                            <Route path="/publish-manage/sunset" component={Sunset}/>

                            <Redirect from="/" to="/home" exact/>
                            <Route path="*" component={NoPermission}/>
                        </Switch>
                        </Content>
                </Layout>
            </Layout>
        </HashRouter>

    )
}