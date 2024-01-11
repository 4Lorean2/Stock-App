import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useAuthCalls from "../service/useAuthCalls";
import MenuListItems from "../components/MenuListItems";
import { Outlet } from "react-router-dom";

//Gerekli React, Material-UI bileşenleri ile ilgili modüller içe aktarılır.

//***********************************************************/

const drawerWidth = 200; //Drawer (menü çubuğu) genişliği için bir sabit değer belirlenir.
//***********************************************************/
function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();

//Dashboard adlı bir fonksiyonel bileşen tanımlanır. State yönetimi için mobileOpen adında bir state ve Redux'tan kullanıcı bilgisini çekmek için useSelector kullanılır. Ayrıca, kullanıcı işlemlerini yöneten bir özel hook olan useAuthCalls kullanılır.

//***********************************************************/
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

// Mobil cihazlarda menü çubuğunun açılıp kapatılmasını sağlayan bir fonksiyon tanımlanır.
//***********************************************************/
  const drawer = (
    <div>
      <Toolbar /> //*MUI den alınan uygulama çubuğu
      <Divider />
      <MenuListItems />
    </div>

//Menü çubuğu içeriği drawer adında bir değişkende tanımlanır. MenuListItems bileşeni, menü öğelerini içerir.
  );
//***********************************************************/

  const container =
    window !== undefined ? () => window().document.body : undefined;
//window !== undefined: Eğer window nesnesi tanımlıysa (yani, sayfa bir tarayıcı ortamında çalışıyorsa),
//() => window().document.body: Bir fonksiyon döndürür. Bu fonksiyon, window().document.body ifadesini kullanarak, sayfanın body (gövde) elemanını temsil eden bir referansı döndürür.Eğer window nesnesi tanımlı değilse, undefined: Eğer window nesnesi tanımlı değilse, container değişkeni undefined olarak atanır.

//Bu yapı, genellikle belirli bir işlemin tarayıcı ortamında gerçekleştirilip gerçekleştirilemediğini kontrol etmek için kullanılır. Eğer bir web tarayıcısı ortamında çalışılıyorsa, window nesnesi tanımlı olacaktır.

//***********************************************************/
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline /> 
      {/* Normalde tarayıcılar arasında bazı stil farklılıkları olabilir ve bu farklılıklar uygulamanın genel görünümünü etkileyebilir. CssBaseline kullanılarak, tarayıcılar arasındaki bu farklılıkların giderilmesi ve bir temel düzenin sağlanması hedeflenir. Böylece, uygulama daha tutarlı bir görünüme sahip olur. */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stock App
          </Typography>

          {user && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* //uygulama çubuğu (AppBar) tanımlanır. IconButton ile mobil cihazlarda menü çubuğunu açma/kapatma işlevselliği eklenir. Uygulama adı ve kullanıcı oturumu açıksa çıkış butonu (Logout) eklenir. */}
      
      //***********************************************************
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "secondary.main",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "secondary.main",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* //Menü çubuğu (Drawer) tanımlanır. Mobil cihazlarda açılırken (variant="temporary") veya daha büyük ekranlarda sürekli (variant="permanent") olarak görüntülenir. Stil ve görünüm ayarları Material-UI'nin sx özelliği kullanılarak yapılır. */}
      //***********************************************************/
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );

}
// Ana içerik alanı tanımlanır. Outlet ile React Router tarafından yönetilen sayfaların içeriği burada görüntülenir.
//***********************************************************/
export default Dashboard;
