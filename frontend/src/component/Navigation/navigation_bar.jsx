import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout,login } from '../../actions/userAction';
import store from "../../store"
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useState} from "react"
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['Laptop','Rackets', 'String', 'Bags', "Apparels","Clothes"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const ResponsiveAppBar = () => {
  const{isAuthenticated}=useSelector(state=>state.user)
  console.log(isAuthenticated)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const navigator= (path)=>{
    navigate(path)
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [isAuthenticated]=useSelector(state=>state.user)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const [price, setPrice] = useState([0,2000]);
const handleChange = (price, newPrice) => {
setPrice(newPrice);
}
const [currentPage,setCurrentPage]=useState(1);  
const [category,setCategory]=useState("")
console.log(category)
const [ratings,setRatings]=useState(0)
const {loading,error,products,productsCount,resultsPerPage}= 
useSelector((state)=>state.products
);
const keyword=useParams().keyword;
const setCurrentPageNo=(e)=>{
setCurrentPage(e);
};


useEffect(()=>{
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
},[dispatch,keyword,currentPage,price,category,ratings]);


  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                onClick={()=>setCategory(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <h3>{page}</h3>
              </Button>
            ))}
          </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {
          isAuthenticated ?
          <Button  variant="contained" onClick={() =>dispatch(logout())}>Logout</Button>
          :
          <Button variant="contained"  onClick={() => navigator("/login")}>Login</Button>
        }
        <Button variant="conatined" >Cart
        <ShoppingCartIcon></ShoppingCartIcon></Button>
        <Button variant="conatined"  onClick={() => navigator("/account")}><h4>Profile</h4>
        <AccountCircleIcon/>
        </Button>
        </Toolbar>
      </AppBar> 
      </Box>
  );
};
export default ResponsiveAppBar;
