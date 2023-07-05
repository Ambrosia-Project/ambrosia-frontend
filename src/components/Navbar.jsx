import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import authService from "../services/auth.service";
import secondLogo from "../assets/images/secondLogo.png";
import SessionHelper from "../helpers/SessionHelper";
import Badge from "@mui/material/Badge";
import { ThemeProvider, styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme } from "@mui/material/styles";
import orderService from "../services/order.service";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEBA2B",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const pages = ["Menus", "Blog", "Create Blog"];
const pagesWaiter = ["Menus", "Blog", "Orders"];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [orderCount, setOrderCount] = React.useState(0);
  const [profileImage, setProfileImage] = React.useState(null);
  const user = SessionHelper.getUser();
  const userRole = user.role;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    if (page === "Blog") {
      window.location.href = "/blogs";
    } else if (page === "Create Blog" && userRole !== "waiter") {
      window.location.href = "/blogs/create";
    } else if (page === "Menus") {
      window.location.href = "/menuList";
    } else if (page === "Orders" && userRole === "waiter") {
      window.location.href = "/allOrders";
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      authService.logout();
      window.location.reload();
    } else if (setting === "Profile" && userRole !== "waiter") {
      window.location.href = `/profile`;
    }
  };

  React.useEffect(() => {
    if (userRole === "customer") {
      orderService
        .getOrders(user.email)
        .then((response) => {
          console.log(response.data);
          setOrderCount(response.data.content.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfileImage(user.image);
    }
  }, []);

  const handleOrder = () => {
    window.location.href = `/orders/${user.email}&customer`;
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" style={{ background: "#5e714e" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <img
                src={secondLogo}
                alt="logo"
                style={{
                  width: "180px",
                  height: "auto",
                  marginRight: 1,
                  boxShadow: "0px 0px 10px 5px #ffffff", // Initially no shadow
                }}
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                style={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {userRole === "customer" &&
                  pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                {userRole === "waiter" &&
                  pagesWaiter.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              <img
                src={secondLogo}
                alt="logo"
                style={{
                  width: "150px",
                  height: "auto",
                  mr: 1,
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {userRole === "customer" &&
                pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              {userRole === "waiter" &&
                pagesWaiter.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {userRole === "customer" && (
                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: "20px" }}
                  onClick={handleOrder}
                >
                  <StyledBadge badgeContent={orderCount} color="primary">
                    <ShoppingCartIcon sx={{ color: "#fff" }} />
                  </StyledBadge>
                </IconButton>
              )}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="userImage" src={profileImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userRole === "customer" &&
                  settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                {userRole === "waiter" && (
                  <MenuItem
                    key={"waiter"}
                    onClick={() => handleCloseUserMenu("Logout")}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
