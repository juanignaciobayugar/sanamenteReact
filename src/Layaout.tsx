import Aside from "./Aside"
import Central from "./Central"


function Layout() {


  return (
    <>
      {/* Header (encabezado) / Navbar (barra de navegacion) */}
    <div className="layout">
        <Aside/>
        <Central/>
        <Aside/>
    </div>
    </>
  )
}

export default Layout