import { Logout } from '@mui/icons-material';
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Profile = () => {
    const {setItems} = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(0);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = (e) =>{
       localStorage.removeItem('token');
       setItems('');
       navigate('/');
    }
    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}>
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem>
                    <Avatar /> <Link to="/profile">Profile</Link>   
                </MenuItem>
                <MenuItem>
                    <Avatar /> update Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout></Logout>
                    </ListItemIcon>
                   <Button onClick={logout}>logut</Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Profile;