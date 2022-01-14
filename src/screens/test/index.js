import React, {useEffect, useRef, useState} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaHeart} from "react-icons/all";
import {Link, Route, Switch, useHistory, useRouteMatch, BrowserRouter} from 'react-router-dom';
import {SideBar} from "./sideBar";
import {Col} from "react-bootstrap";
import {T1} from "./t1";
import {T2} from "./t2";

export const Test = () => {
    let history = useHistory();
    let { path } = useRouteMatch();
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <div>
                        <SideBar/>
                        <Route path={`/test2`} exact ><T2/></Route>
                        <Route ppath={`/test1`} exact ><T1/></Route>
                    </div>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
