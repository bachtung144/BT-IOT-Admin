import React, {useEffect, useRef, useState} from 'react';
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {FaGem} from "react-icons/all";
import {Link, useHistory} from "react-router-dom";

export const SideBar = () => {
    let history = useHistory();
    return(
        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}>
                    test1
                    <Link to={'/test1'}/>
                </MenuItem>
                <MenuItem icon={<FaGem />}>
                    test2
                    <Link to={'/test2'}/>
                </MenuItem>
            </Menu>
        </ProSidebar>
    )
}
